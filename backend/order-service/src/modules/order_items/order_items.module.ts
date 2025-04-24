import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order_items.entity';
import { OrderItemsService } from './services/order-items.service';
import { OrderItemsController } from './controllers/order-items.controller';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { Order } from '../orders/entities/orders.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem, Order])], 
  controllers: [OrderItemsController],
  providers: [OrderItemsService, ClientProxyFactoryService],
  exports: [OrderItemsService, TypeOrmModule], 
})
export class OrderItemsModule {}