import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './services/orders.service';
import { Order } from './entities/orders.entity';
import { OrdersController } from './controllers/orders.controller';
import { OrderShippingAddressModule } from '../order_shipping_address/order_shipping_address.module';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { OrderItemsModule } from '../order_items/order_items.module';
import { OrderPromotionsModule } from '../order_promotions/order_promotions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    OrderShippingAddressModule,
    OrderItemsModule,
    OrderPromotionsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, ClientProxyFactoryService],
})
export class OrdersModule {}
