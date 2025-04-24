import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Order } from '../entities/orders.entity';
import { firstValueFrom } from 'rxjs';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { OrderService as IOrderService} from '../interfaces/order.service.interface';
import { OrderShipMethod, OrderStatus } from '../enums/order.enum';

@Injectable()
export class OrdersService implements IOrderService{
  private readonly logger = new Logger(OrdersService.name);
  private userClient: ClientProxy;

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly clientProxyFactory: ClientProxyFactoryService,
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
      throw new RpcException(new NotFoundException(`Order ${id} không tồn tại`));
    }
    const [enriched] = await this.enrichOrdersWithUserInfo([order]);
    return enriched;
  }

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    this.logger.log(`Tạo đơn hàng: ${JSON.stringify(orderData)}`);
    
    // Kiểm tra user tồn tại
    const userExists = await this.checkUserExists(orderData.user_id);
    if (!userExists) {
      throw new RpcException(new NotFoundException(`User ${orderData.user_id} không tồn tại`));
    }
  
    const total = orderData.total_price ?? 0;
    const discount = orderData.discount ?? 0;
  
    // Kiểm tra tổng tiền và giảm giá
    if (discount < 0 || total <= 0) {
      throw new RpcException(new BadRequestException('Tổng tiền phải > 0 và giảm giá ≥ 0'));
    }
  
    if (discount >= total) {
      throw new RpcException(new BadRequestException('Tổng tiền phải lớn hơn giảm giá'));
    }
  
    if (discount / total > 0.9) {
      throw new RpcException(new BadRequestException('Giảm giá vượt quá giới hạn'));
    }
  
    if (orderData.ship_method === OrderShipMethod.PICK_UP) {
      orderData.order_status = OrderStatus.COMPLETED;
    }
  
    const final_price = total - discount;
  
    const newOrder = this.orderRepository.create({
      ...orderData,
      discount,
      final_price,
    });
  
    return this.orderRepository.save(newOrder);
  }
  

  async updateOrder(id: number, orderData: Partial<Order>): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new RpcException(new NotFoundException(`Order ${id} không tồn tại`));
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

    const userIds = [...new Set(orders.map(order => order.user_id))];

    let usersMap = {};
    try {
      usersMap = await firstValueFrom(
        this.userClient.send('get_users_by_ids', { ids: userIds }),
      );
    } catch (error) {
      this.logger.error(`Không lấy được user info: ${error.message}`);
    }

    return orders.map(order => ({
      ...order,
      user: usersMap[order.user_id] || null,
    }));
  }
}
