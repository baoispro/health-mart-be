import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Order } from '../entities/orders.entity';
import { firstValueFrom } from 'rxjs';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { OrderService as IOrderService } from '../interfaces/order.service.interface';
import { OrderShipMethod, OrderStatus } from '../enums/order.enum';
import { OrderShippingAddress } from 'src/modules/order_shipping_address/entities/order_shipping_address.entity';
import { OrderItem } from 'src/modules/order_items/entities/order_items.entity';
import { OrderPromotion } from 'src/modules/order_promotions/entities/order_promotions.entity';

@Injectable()
export class OrdersService implements IOrderService {
  private readonly logger = new Logger(OrdersService.name);
  private userClient: ClientProxy;

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderShippingAddress)
    private readonly orderShippingAddressRepository: Repository<OrderShippingAddress>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(OrderPromotion)
    private readonly orderPromotionRepository: Repository<OrderPromotion>,
    private readonly clientProxyFactory: ClientProxyFactoryService,
    private dataSource: DataSource,
  ) {
    this.userClient = this.clientProxyFactory.createClient('userService');
  }

  async findAll(): Promise<any[]> {
    const orders = await this.orderRepository.find();
    return this.enrichOrdersWithUserInfo(orders);
  }

  async getAllOrders(): Promise<any[]> {
    const orders = await this.orderRepository.find();
    return this.enrichOrdersWithUserInfo(orders);
  }

  async getOrderById(id: number): Promise<any> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new RpcException(
        new NotFoundException(`Order ${id} không tồn tại`),
      );
    }
    const [enriched] = await this.enrichOrdersWithUserInfo([order]);
    return enriched;
  }

  async createOrder(orderData: any): Promise<Order> {
    this.logger.log(`Tạo đơn hàng: ${JSON.stringify(orderData)}`);

    const total = orderData.total_price ?? 0;
    const discount = orderData.discount ?? 0;

    if (discount < 0 || total <= 0) {
      throw new RpcException(
        new BadRequestException('Tổng tiền phải > 0 và giảm giá ≥ 0')
      );
    }
    if (discount >= total) {
      throw new RpcException(
        new BadRequestException('Tổng tiền phải lớn hơn giảm giá')
      );
    }

    // Cập nhật trạng thái đơn hàng dựa vào hình thức giao hàng
    if (orderData.ship_method === OrderShipMethod.PICK_UP) {
      orderData.order_status = OrderStatus.COMPLETED;
    } else {
      orderData.order_status = OrderStatus.PENDING;
    }

    const final_price = total - discount;

    return await this.dataSource.transaction(async (manager) => {
      // Bước 1: Tạo và lưu Order (không gán shippingAddress và items lúc này)
      const orderPayload: any = {
        user_id: orderData.user_id || null,
        total_price: orderData.total_price,
        discount: discount,
        final_price: final_price,
        ship_method: orderData.ship_method,
        order_status: orderData.order_status,
      };

      const newOrder = manager.create(Order, orderPayload);
      const savedOrder = await manager.save(newOrder);

      // Bước 2: Nếu có dữ liệu shippingAddress, tạo và lưu Shipping Address riêng
      if (orderData.shippingAddress) {
        const shippingPayload = manager.create(OrderShippingAddress, {
          city: orderData.shippingAddress.city,
          district: orderData.shippingAddress.district,
          ward: orderData.shippingAddress.ward,
          address: orderData.shippingAddress.address,
          recipientName: orderData.shippingAddress.recipientName,
          phoneNumber: orderData.shippingAddress.phoneNumber,
        });

        // Liên kết Shipping Address với Order
        shippingPayload.order = savedOrder;
        const savedShipping = await manager.save(
          OrderShippingAddress,
          shippingPayload,
        );

        // Cập nhật lại Order (owning side) với Shipping Address vừa lưu
        savedOrder.shippingAddress = savedShipping;
        await manager.save(Order, savedOrder);
      }

      // Bước 3: Nếu có Order Items, tạo các đối tượng OrderItem và lưu chúng
      if (Array.isArray(orderData?.items) && orderData.items.length > 0) {
        const orderItems = orderData.items.map((itemData: any) => {
          // Tạo đối tượng OrderItem cho từng item
          const orderItem = manager.create(OrderItem, {
            product_id: itemData.product_id,
            quantity: itemData.quantity,
            price: itemData.price,
          });
          // Liên kết với Order vừa tạo
          orderItem.order = savedOrder;
          return orderItem;
        });
        // Lưu toàn bộ các OrderItem trong một lần
        await manager.save(OrderItem, orderItems);
      }

      // Bước 4: Tải lại Order trên DB với cả quan hệ shippingAddress và items
      const fullOrder = await manager.findOne(Order, {
        where: { id: savedOrder.id },
        relations: ['shippingAddress', 'items'],
        cache: false,
      });

      if (!fullOrder) {
        throw new RpcException('Failed to create order');
      }
      return fullOrder;
    });
  }

  async updateOrder(id: number, orderData: Partial<Order>): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new RpcException(
        new NotFoundException(`Order ${id} không tồn tại`),
      );
    }

    if (orderData.ship_method === OrderShipMethod.PICK_UP) {
      orderData.order_status = OrderStatus.COMPLETED;
    }

    const updatedOrder = this.orderRepository.create({
      ...order,
      ...orderData,
    });

    await this.orderRepository.save(updatedOrder);

    return updatedOrder;
  }

  private async checkUserExists(user_id: number): Promise<boolean> {
    try {
      const result = await firstValueFrom(
        this.userClient.send('check_user_exists', { user_id }),
      );
      return result;
    } catch (error) {
      this.logger.error(`Lỗi kiểm tra user: ${error.message}`);
      return false;
    }
  }

  private async enrichOrdersWithUserInfo(orders: Order[]): Promise<any[]> {
    if (orders.length === 0) return [];

    const userIds = [...new Set(orders.map((order) => order.user_id))];

    let usersMap = {};
    try {
      usersMap = await firstValueFrom(
        this.userClient.send('get_users_by_ids', { ids: userIds }),
      );
    } catch (error) {
      this.logger.error(`Không lấy được user info: ${error.message}`);
    }

    return orders.map((order) => ({
      ...order,
      user: usersMap[order.user_id] || null,
    }));
  }
}
