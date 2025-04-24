import { OrderShippingAddress } from '../entities/order_shipping_address.entity';
import { CreateOrderShippingAddressRequest } from '../dto/requests/create-ordershippingaddress-request.dto';

export interface OrderShippingAddressService {
  findAll(): Promise<OrderShippingAddress[]>;
  findOne(orderShippingAddressId: number): Promise<OrderShippingAddress>;
  getShippingAddress(orderId: number): Promise<OrderShippingAddress>;
  createShippingAddress(createRequest: CreateOrderShippingAddressRequest): Promise<OrderShippingAddress>;
  updateShippingAddress(orderId: number, shippingData: Partial<OrderShippingAddress>): Promise<OrderShippingAddress>;
  deleteShippingAddress(orderId: number): Promise<void>;
}
