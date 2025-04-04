import { 
  BadRequestException, 
  Inject, 
  Injectable, 
  InternalServerErrorException, 
  Logger, 
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Order } from '../entities/orders.entity';
import { firstValueFrom } from 'rxjs';
import { OrderShipMethod, OrderStatus } from '../enums/order.enum';
import { appConfig } from '../../config/app.config';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);
  private userClient: ClientProxy;

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
    // Khởi tạo kết nối tới userService qua RabbitMQ
    this.userClient = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'], // Đảm bảo đúng URL của RabbitMQ
        queue: appConfig.userService.queue, // Lấy queue từ config
        queueOptions: { durable: false },
      },
    });
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async checkUserExists(user_id: number): Promise<boolean> {
    this.logger.log(`Kiểm tra user_id: ${user_id}`);

    try {
      const result = await firstValueFrom(
        this.userClient.send({ cmd: 'check_user_exists' }, { user_id })
      );
      return result;
    } catch (error) {
      this.logger.error(`Lỗi khi kiểm tra user: ${error.message}`);
      throw new InternalServerErrorException('Lỗi kết nối user service');
    }
  }

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    this.logger.log(`Nhận yêu cầu tạo đơn hàng: ${JSON.stringify(orderData)}`);

    const userExists = await this.checkUserExists(orderData.user_id);
    if (!userExists) {
      throw new BadRequestException(`User ID ${orderData.user_id} không tồn tại!`);
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

  async updateOrder(id: number, orderData: Partial<Order>): Promise<Order | null> {
    if (!orderData || Object.keys(orderData).length === 0) {
      throw new BadRequestException("Không có dữ liệu cập nhật!");
    }
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Không tìm thấy đơn hàng với ID ${id}`);
    }

    await this.orderRepository.update(id, orderData);
    return this.orderRepository.findOne({ where: { id } });
  }

  async deleteOrder(id: number): Promise<boolean> {
    const result = await this.orderRepository.delete(id);
    return result.affected > 0;
  }
}
