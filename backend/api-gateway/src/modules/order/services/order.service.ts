import { Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { UpdateOrderRequest } from '../dto/requests/update-order-request.dto';
import { catchError, firstValueFrom, throwError } from 'rxjs'; // Import firstValueFrom để xử lý Observable

@Injectable()
export class OrderService {
  private orderClient: ClientProxy;
  private userClient: ClientProxy;

  constructor(private readonly clientProxyFactory: ClientProxyFactoryService) {
    this.orderClient = this.clientProxyFactory.createClient('orderService');
    this.userClient = this.clientProxyFactory.createClient('userService');
  }

  getOrders() {
    return this.orderClient.send({ cmd: 'get_orders' }, {});
  }

  async createOrder(orderData: any) {
    return await firstValueFrom(
      this.orderClient
        .send({ cmd: 'create_order' }, orderData)
        .pipe(
          catchError((error) =>
            throwError(() => new RpcException(error.response)),
          ),
        ),
    );
  }

  getOrderById(id: number) {
    return this.orderClient
      .send({ cmd: 'get_order_by_id' }, { id })
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  updateOrder(id: number, updateOrderRequest: UpdateOrderRequest) {
    return this.orderClient
      .send({ cmd: 'update_order' }, { id, updateOrderRequest })
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }
}
