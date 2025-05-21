import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderPromotionsService } from './services/order_promotions.service';
import { OrderPromotion } from './entities/order_promotions.entity';
import { OrderPromotionsController } from './controllers/order_promotions.controller';
import { Order } from '../orders/entities/orders.entity';
import { DiscountCode } from '../discount_code/entities/discount_code.entity';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';

@Module({
  imports: [TypeOrmModule.forFeature([OrderPromotion, Order, DiscountCode])],
  controllers: [OrderPromotionsController],
  providers: [OrderPromotionsService, ClientProxyFactoryService],
})
export class OrderPromotionsModule {}
