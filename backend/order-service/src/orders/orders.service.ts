import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { Order } from './orders.entity';
import { ClientProxyFactoryService } from '../utils/client-proxy.factory'; // Đảm bảo đường dẫn đúng

@Injectable()
export class OrdersService {
  private userClient: ClientProxy;

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    private readonly clientProxyFactory: ClientProxyFactoryService, // Inject service này vào
  ) {
    this.userClient = this.clientProxyFactory.createClient('userService'); // Khởi tạo ClientProxy
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findUser(): Promise<any> {
    return this.userClient.send({ cmd: 'get_all_users' }, {}).toPromise(); // Gửi request đến User Service
  }
}
