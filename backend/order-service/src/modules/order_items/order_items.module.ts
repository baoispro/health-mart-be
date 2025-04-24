import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemsService } from './services/order_items.service';
import { OrderItem } from './entities/order_items.entity';
import { OrderItemsController } from './controllers/order_items.controller';
import { Order } from '../orders/entities/orders.entity';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem, Order])],
  controllers: [OrderItemsController],
  providers: [OrderItemsService, ClientProxyFactoryService],
})
export class OrderItemsModule {}
