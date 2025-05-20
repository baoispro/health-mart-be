// order-shipping-address.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderShippingAddress } from './entities/order_shipping_address.entity';
import { Order } from '../orders/entities/orders.entity';
import { OrderShippingAddressController } from './controllers/order_shipping_address.controller';
import { OrderShippingAddressService } from './services/order_shipping_address.service';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';

@Module({
  imports: [TypeOrmModule.forFeature([OrderShippingAddress, Order])],
  controllers: [OrderShippingAddressController],
  providers: [OrderShippingAddressService, ClientProxyFactoryService],
  exports: [OrderShippingAddressService],
})
export class OrderShippingAddressModule {}
