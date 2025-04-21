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
    const userExists = await this.checkUserExists(orderData.user_id);

    if (!userExists) {
      throw new RpcException(new NotFoundException(`User ${orderData.user_id} không tồn tại`));
    }

    const newOrder = this.orderRepository.create(orderData);
    return this.orderRepository.save(newOrder);
  }

  async updateOrder(id: number, orderData: Partial<Order>): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new RpcException(new NotFoundException(`Order ${id} không tồn tại`));
    }
    await this.orderRepository.update(id, orderData);
    return this.orderRepository.findOne({ where: { id } });
  }

  async checkUserExists(user_id: number): Promise<boolean> {
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
