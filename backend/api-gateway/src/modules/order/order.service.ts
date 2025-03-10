import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';

@Injectable()
export class OrderService {
  private orderClient: ClientProxy;

  constructor(private readonly clientProxyFactory: ClientProxyFactoryService){
          this.orderClient = this.clientProxyFactory.createClient('orderService');
      }

      getOrders() {
        return this.orderClient.send({ cmd: 'get_all_orders' }, {});
    }
}
