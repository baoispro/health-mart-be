import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Order } from '../entities/orders.entity';
import { firstValueFrom } from 'rxjs';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);
  private userClient: ClientProxy;

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly clientProxyFactory: ClientProxyFactoryService,
  ) {
    this.userClient = this.clientProxyFactory.createClient('userService');
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async checkUserExists(user_id: number): Promise<boolean> {
    this.logger.log(`Kiểm tra user_id: ${user_id}`);

    try {
      const result = await firstValueFrom(
        this.userClient.send('check_user_exists', { user_id }),
      );
      this.logger.log(`Kết quả kiểm tra user_id ${user_id}: ${result}`);
      return result;
    } catch (error) {
      this.logger.error(`Lỗi khi kiểm tra user: ${error.message}`);
    }
  }

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    this.logger.log(`Nhận yêu cầu tạo đơn hàng: ${JSON.stringify(orderData)}`);

    const userExists = await this.checkUserExists(orderData.user_id);
    this.logger.log(userExists == null);
    if (userExists == null) {
      throw new RpcException(
        new NotFoundException(`User ${orderData.user_id} không tìm thấy`),
      );
    }
    const newOrder = this.orderRepository.create(orderData);
    return await this.orderRepository.save(newOrder);
  }

  async getAllOrders(): Promise<Order[]> {
    this.logger.log(`Lấy tất cả đơn hàng`);
    return await this.orderRepository.find();
  }

  async getOrderById(id: number): Promise<Order | null> {
    return await this.orderRepository.findOne({ where: { id } });
  }

  async updateOrder(
    id: number,
    orderData: Partial<Order>,
  ): Promise<Order | null> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new RpcException(
        new NotFoundException(`Không tìm thấy đơn hàng với ID ${id}`),
      );
    }
    await this.orderRepository.update(id, orderData);
    return this.orderRepository.findOne({ where: { id } });
  }
}
