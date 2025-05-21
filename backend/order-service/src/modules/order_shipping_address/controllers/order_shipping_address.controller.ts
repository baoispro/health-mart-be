import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderShippingAddressService } from '../services/order_shipping_address.service';
import { OrderShippingAddress } from '../entities/order_shipping_address.entity';
import { CreateOrderShippingAddressRequest } from '../dto/requests/create-ordershippingaddress-request.dto';
import { UpdateOrderShippingAddressRequest } from '../dto/requests/update-ordershippingaddress-request.dto';

@Controller('order-shipping-addresses')
export class OrderShippingAddressController {
  constructor(
    private readonly shippingAddressService: OrderShippingAddressService,
  ) {}

  @MessagePattern({ cmd: 'create_order_shipping_address' })
  async create(
    @Payload() createRequest: CreateOrderShippingAddressRequest,
  ): Promise<OrderShippingAddress> {
    return this.shippingAddressService.createShippingAddress(createRequest);
  }

  @MessagePattern({ cmd: 'get_all_order_shipping_addresses' })
  async findAll(): Promise<any[]> {
    return this.shippingAddressService.findAll();
  }

  @MessagePattern({ cmd: 'get_order_shipping_address_by_id' })
  async findOne(@Payload() data: { id: number }): Promise<any> {
    return this.shippingAddressService.findOne(data.id);
  }

  @MessagePattern({ cmd: 'get_shipping_address_by_order_id' })
  async findByOrderId(@Payload() data: { orderId: number }): Promise<any> {
    return this.shippingAddressService.getShippingAddress(data.orderId);
  }

  @MessagePattern({ cmd: 'update_order_shipping_address' })
  async update(
    @Payload()
    data: {
      id: number;
      updateRequest: UpdateOrderShippingAddressRequest;
    },
  ): Promise<any> {
    return this.shippingAddressService.updateShippingAddress(
      data.id,
      data.updateRequest,
    );
  }

  @MessagePattern({ cmd: 'delete_order_shipping_address' })
  async delete(@Payload() data: { id: number }): Promise<void> {
    return this.shippingAddressService.deleteShippingAddress(data.id);
  }
}
