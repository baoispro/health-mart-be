import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from '../entities/order_items.entity';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { firstValueFrom } from 'rxjs';
import { OrderItemsService as IOrderItemsService } from '../interfaces/order_items.service.interface';
import { Order } from '../../orders/entities/orders.entity';
import { CreateOrderItemRequest } from '../dto/requests/create-order_items-request.dto';

@Injectable()
export class OrderItemsService implements IOrderItemsService {
  private readonly logger = new Logger(OrderItemsService.name);
  private productClient: ClientProxy;

  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly clientProxyFactory: ClientProxyFactoryService,
  ) {
    this.productClient = this.clientProxyFactory.createClient('productService');
  }

  async findAll(): Promise<OrderItem[]> {
    return await this.orderItemRepository.find({ relations: ['order'] });
  }

  async findByOrderId(orderId: number): Promise<OrderItem[]> {
    const orderExists = await this.orderRepository.findOne({ where: { id: orderId } });
    if (!orderExists) {
      throw new RpcException(new NotFoundException(`Order ID ${orderId} không tồn tại`));
    }
  
    return await this.orderItemRepository.find({
      where: { order: { id: orderId } },
      relations: ['order'],
    });
  }

  private async checkProductExists(productId: number): Promise<boolean> {
    try {
      const result = await firstValueFrom(
        this.productClient.send('check_product_exist', productId),
      );
      return result;
    } catch (error) {
      this.logger.error(`Lỗi khi kiểm tra product: ${error.message}`);
      return false;
    }
  }

  async getProductPrice(productId: number): Promise<number> {
    try {
      const result = await firstValueFrom(
        this.productClient.send({ cmd: 'get_product_price' }, { productId })
      );
      const price = Number(result);
      if (isNaN(price)) {
        throw new RpcException(`Invalid price returned for product ${productId}`);
      }
      return price;
    } catch (error) {
      this.logger.error(`Failed to get price for product ID ${productId}: ${error.message}`);
      throw new RpcException('Error fetching product price');
    }
  }

  async createOrderItem(dtos: CreateOrderItemRequest[] | CreateOrderItemRequest): Promise<OrderItem[]> {
    const dtosArray: CreateOrderItemRequest[] = Array.isArray(dtos) ? dtos : [dtos];
    const createdItems: OrderItem[] = [];
  
    for (const dto of dtosArray) {
      if (typeof dto.product_id !== 'number') {
        throw new RpcException(new BadRequestException(`product_id phải là số, nhận được: ${dto.product_id}`));
      }
  
      if (typeof dto.quantity !== 'number') {
        throw new RpcException(new BadRequestException(`quantity phải là số, nhận được: ${dto.quantity}`));
      }
  
      if (typeof dto.order_id !== 'number') {
        throw new RpcException(new BadRequestException(`order_id phải là số, nhận được: ${dto.order_id}`));
      }
  
      const isProductExist = await this.checkProductExists(dto.product_id);
      if (!isProductExist) {
        throw new RpcException(new NotFoundException(`Sản phẩm với ID ${dto.product_id} không tồn tại`));
      }
  
      const price = await this.getProductPrice(dto.product_id);
  
      const orderExists = await this.orderRepository.findOneBy({ id: dto.order_id });
      if (!orderExists) {
        throw new RpcException(new NotFoundException(`Đơn hàng với ID ${dto.order_id} không tồn tại`));
      }
  
      const orderItem = this.orderItemRepository.create({
        order: orderExists,
        product_id: dto.product_id,
        quantity: dto.quantity,
        price: price,
      });
  
      createdItems.push(orderItem);
    }
  
    await this.orderItemRepository.save(createdItems);
  
    return createdItems;
  }
  

  
  async deleteItemById(orderItemId: number): Promise<{ message: string }> {
    const item = await this.orderItemRepository.findOne({ where: { id: orderItemId } });
    if (!item) {
      throw new RpcException(new NotFoundException(`Không tìm thấy item với ID ${orderItemId}`));
    }
  
    await this.orderItemRepository.remove(item);
  
    return { message: `Item với ID ${orderItemId} đã được xóa thành công` };
  }
}
