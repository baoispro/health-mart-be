import { Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { CreateOrderShippingAddressRequest } from '../dto/requests/create-ordershippingaddress-request.dto';
import { UpdateOrderShippingAddressRequest } from '../dto/requests/update-ordershippingaddress-request.dto';

@Injectable()
export class OrderShippingAddressService {
  private readonly orderShippingAddressClient: ClientProxy;

  constructor(
    private readonly clientProxyFactory: ClientProxyFactoryService,
  ) {
    this.orderShippingAddressClient = this.clientProxyFactory.createClient('orderService');
  }

  private handleError = catchError((error) =>
    throwError(() => new RpcException(error.response || error.message)),
  );

  async create(createDto: CreateOrderShippingAddressRequest) {
    try {
      return await firstValueFrom(
        this.orderShippingAddressClient
          .send({ cmd: 'create_order_shipping_address' }, createDto)
          .pipe(this.handleError)
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await firstValueFrom(
      this.orderShippingAddressClient
        .send({ cmd: 'get_all_order_shipping_addresses' }, {})
        .pipe(this.handleError)
    );
  }

  async findOne(id: number) {
    try {
      return await firstValueFrom(
        this.orderShippingAddressClient
          .send({ cmd: 'get_order_shipping_address_by_id' }, { id })
          .pipe(this.handleError)
      );
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateDto: UpdateOrderShippingAddressRequest) {
    try {
      return await firstValueFrom(
        this.orderShippingAddressClient
          .send({ cmd: 'update_order_shipping_address' }, { id, updateRequest: updateDto })
          .pipe(this.handleError)
      );
    } catch (error) {
      throw error;
    }
  }

  async findByOrderId(orderId: number) {
    try {
      return await firstValueFrom(
        this.orderShippingAddressClient
          .send({ cmd: 'get_shipping_address_by_order_id' }, { orderId })
          .pipe(this.handleError)
      );
    } catch (error) {
      throw error;
    }
  }
}
