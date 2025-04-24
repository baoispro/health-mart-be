// src/modules/order_shipping_address/order_shipping_address.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderShippingAddressService } from './services/order_shipping_address.service';
import { OrderShippingAddressController } from './controllers/order_shipping_address.controller';
import { OrderShippingAddress } from './entities/order_shipping_address.entity';
import { Order } from '../orders/entities/orders.entity';
import { ClientProxyFactoryService } from '../../utils/client-proxy.factory';

@Module({
  imports: [TypeOrmModule.forFeature([OrderShippingAddress, Order])],
  controllers: [OrderShippingAddressController],
  providers: [OrderShippingAddressService, ClientProxyFactoryService],
})
export class OrderShippingAddressModule {}
