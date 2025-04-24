import { Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { CreateOrderItemRequest } from '../dto/requests/create-order_item-request.dto';
import { UpdateOrderItemRequest } from '../dto/requests/update-order_item-request.dto';

@Injectable()
export class OrderItemService {
  private readonly orderItemClient: ClientProxy;

  constructor(private readonly clientProxyFactory: ClientProxyFactoryService) {
    this.orderItemClient = this.clientProxyFactory.createClient('orderService');
  }

  private handleError = catchError((error) =>
    throwError(() => new RpcException(error.response || error.message)),
  );

  getAllOrderItems() {
    return this.orderItemClient
      .send('get_all_order_items', {})
      .pipe(this.handleError);
  }

  getOrderItemById(id: number) {
    return this.orderItemClient
      .send('get_order_item_by_id', id)
      .pipe(this.handleError);
  }

  createOrderItem(createOrderItemRequest: CreateOrderItemRequest) {
    return this.orderItemClient
      .send('create_order_item', createOrderItemRequest)
      .pipe(this.handleError);
  }

  updateOrderItem(id: number, updateOrderItemRequest: UpdateOrderItemRequest) {
    return this.orderItemClient
      .send('update_order_item', { id, updateOrderItemRequest })
      .pipe(this.handleError);
  }

  deleteOrderItem(id: number) {
    return this.orderItemClient
      .send('delete_order_item', id)
      .pipe(this.handleError);
  }
}
