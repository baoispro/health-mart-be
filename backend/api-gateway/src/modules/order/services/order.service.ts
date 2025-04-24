import { Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { UpdateOrderRequest } from '../dto/requests/update-order-request.dto';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { CreateOrderShippingAddressRequest } from '../dto/requests/create-ordershippingaddress-request.dto';
import { UpdateOrderShippingAddressRequest } from '../dto/requests/update-ordershippingaddress-request.dto';
import { CreateOrderItemRequest } from '../dto/requests/create-order_items-request.dto';
import { CreateOrderPromotionRequest } from '../dto/requests/create-order_promotions-request.dto';
import { UpdateOrderPromotionRequest } from '../dto/requests/update-order_promotions-request.dto';

@Injectable()
export class OrderService {
  private orderClient: ClientProxy;
  private userClient: ClientProxy;

  constructor(private readonly clientProxyFactory: ClientProxyFactoryService) {
    this.orderClient = this.clientProxyFactory.createClient('orderService');
    this.userClient = this.clientProxyFactory.createClient('userService');
  }

  private handleError = catchError((error) =>
    throwError(() => new RpcException(error.response || error.message)),
  );

  // ORDER

  getOrders() {
    return this.orderClient.send({ cmd: 'get_orders' }, {});
  }

  async createOrder(orderData: any) {
    return await firstValueFrom(
      this.orderClient
        .send({ cmd: 'create_order' }, orderData)
        .pipe(this.handleError),
    );
  }

  getOrderById(id: number) {
    return this.orderClient
      .send({ cmd: 'get_order_by_id' }, { id })
      .pipe(this.handleError);
  }

  updateOrder(id: number, updateOrderRequest: UpdateOrderRequest) {
    return this.orderClient
      .send({ cmd: 'update_order' }, { id, updateOrderRequest })
      .pipe(this.handleError);
  }

  // ORDER SHIPPING ADDRESS

  async createShippingAddress(createDto: CreateOrderShippingAddressRequest) {
    return await firstValueFrom(
      this.orderClient
        .send({ cmd: 'create_order_shipping_address' }, createDto)
        .pipe(this.handleError),
    );
  }

  getAllShippingAddresses() {
    return this.orderClient.send(
      { cmd: 'get_all_order_shipping_addresses' },
      {},
    );
  }

  async getShippingAddressById(id: number) {
    return await firstValueFrom(
      this.orderClient
        .send({ cmd: 'get_order_shipping_address_by_id' }, { id })
        .pipe(this.handleError),
    );
  }

  async updateShippingAddress(
    id: number,
    updateDto: UpdateOrderShippingAddressRequest,
  ) {
    return await firstValueFrom(
      this.orderClient
        .send(
          { cmd: 'update_order_shipping_address' },
          { id, updateRequest: updateDto },
        )
        .pipe(this.handleError),
    );
  }

  async getShippingAddressByOrderId(orderId: number) {
    return await firstValueFrom(
      this.orderClient
        .send({ cmd: 'get_shipping_address_by_order_id' }, { orderId })
        .pipe(this.handleError),
    );
  }

  // ORDER ITEMS
  getAllOrderItems() {
    return this.orderClient.send({ cmd: 'get_all_order_items' }, {});
  }

  async getOrderItemsByOrderId(orderId: number) {
    return await firstValueFrom(
      this.orderClient
        .send({ cmd: 'get_order_items_by_order_id' }, { orderId })
        .pipe(this.handleError),
    );
  }

  async createOrderItems(items: CreateOrderItemRequest[]) {
    return await firstValueFrom(
      this.orderClient
        .send({ cmd: 'create_order_items' }, items)
        .pipe(this.handleError),
    );
  }

  async deleteItemById(orderItemId: number) {
    return await firstValueFrom(
      this.orderClient
        .send({ cmd: 'delete_order_item_by_id' }, { orderItemId })
        .pipe(this.handleError),
    );
  }

  //ORDER PROMOTIONS
  async getAllOrderPromotions() {
    return this.orderClient.send({ cmd: 'get_all_order_promotions' }, {});
  }

  async getOrderPromotionsByOrderId(orderId: number) {
    return await firstValueFrom(
      this.orderClient
        .send({ cmd: 'get_order_promotions_by_order_id' }, { orderId })
        .pipe(this.handleError),
    );
  }

  async createOrderPromotion(promotionDto: CreateOrderPromotionRequest) {
    console.log('Sending promotionDto:', promotionDto);
    return await firstValueFrom(
      this.orderClient
        .send({ cmd: 'create_order_promotions' }, promotionDto)
        .pipe(this.handleError),
    );
  }

  async updateOrderPromotion(
    id: number,
    updateDto: UpdateOrderPromotionRequest,
  ) {
    return await firstValueFrom(
      this.orderClient
        .send(
          { cmd: 'update_order_promotion' },
          { id, updateOrderPromotionRequest: updateDto },
        )
        .pipe(this.handleError),
    );
  }

  async deleteOrderPromotion(id: number) {
    return await firstValueFrom(
      this.orderClient
        .send({ cmd: 'delete_order_promotion' }, { id })
        .pipe(this.handleError),
    );
  }
}
