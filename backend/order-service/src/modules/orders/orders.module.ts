import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './services/orders.service';
import { Order } from './entities/orders.entity';
import { OrdersController } from './controllers/orders.controller';
import { OrderShippingAddressModule} from '../order_shipping_address/order_shipping_address.module';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    OrderShippingAddressModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, ClientProxyFactoryService],
})
export class OrdersModule {}
