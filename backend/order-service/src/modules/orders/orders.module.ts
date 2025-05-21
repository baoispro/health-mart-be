import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './services/orders.service';
import { Order } from './entities/orders.entity';
import { OrdersController } from './controllers/orders.controller';
import { OrderShippingAddress } from '../order_shipping_address/entities/order_shipping_address.entity';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { OrderItem } from '../order_items/entities/order_items.entity';
import { OrderPromotion } from '../order_promotions/entities/order_promotions.entity';
import { OrderShippingAddressModule } from '../order_shipping_address/order_shipping_address.module';
import { DiscountCode } from '../discount_code/entities/discount_code.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderShippingAddress,
      OrderItem,
      OrderPromotion,
      DiscountCode,
    ]),
    OrderShippingAddressModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, ClientProxyFactoryService],
})
export class OrdersModule {}
