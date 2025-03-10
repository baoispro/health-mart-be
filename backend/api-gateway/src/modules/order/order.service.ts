import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrderService {
  constructor(@Inject('ORDER_SERVICE') private readonly orderClient: ClientProxy) {}

  async createOrder(orderData: any) {
    return this.orderClient.send({ cmd: 'create_order' }, orderData).toPromise();
  }
}
