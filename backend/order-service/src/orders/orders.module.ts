import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { Order } from './orders.entity';
import { OrdersController } from './orders.controller';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';


@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, ClientProxyFactoryService],
})
export class OrdersModule {}
