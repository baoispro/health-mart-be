import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Order } from './orders.entity';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @Inject('USER_SERVICE') // Inject user-service
    private readonly userServiceClient: ClientProxy,
  ) {}

  async checkUserExists(user_id: number): Promise<boolean> {
    this.logger.log(`Kiểm tra user_id: ${user_id}`);

    return new Promise((resolve, reject) => {
      this.userServiceClient.send({ cmd: 'check_user_exists' }, { user_id })
        .subscribe({
          next: (result) => resolve(result),
          error: (err) => reject(err),
        });
    });
  }

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    this.logger.log(`Nhận yêu cầu tạo đơn hàng: ${JSON.stringify(orderData)}`);

    const userExists = await this.checkUserExists(orderData.user_id);
    if (!userExists) {
      throw new Error(`User ID ${orderData.user_id} không tồn tại!`);
    }

    const newOrder = this.orderRepository.create(orderData);
    return await this.orderRepository.save(newOrder);
  }


  async getAllOrders(): Promise<Order[]> {
    this.logger.log(`Nhận yêu cầu lấy tất cả đơn hàng`);
    return await this.orderRepository.find();
  }

  async getOrderById(id: number): Promise<Order | null> {
    return await this.orderRepository.findOne({ where: { id } });
  }


  async updateOrder(id: number, orderData: Partial<Order>): Promise<Order | null> {
    await this.orderRepository.update(id, orderData);
    return this.orderRepository.findOne({ where: { id } });
  }
  
  async deleteOrder(id: number): Promise<boolean> {
    const result = await this.orderRepository.delete(id);
    return result.affected > 0;
  }
  
}
