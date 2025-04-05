import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './services/orders.service';
import { Order } from './entities/orders.entity';
import { OrdersController } from './controllers/orders.controller';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrdersController],
  providers: [OrdersService, ClientProxyFactoryService],
})
export class OrdersModule {}
