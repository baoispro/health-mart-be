import { Module } from '@nestjs/common';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [OrderController],
  providers: [OrderService, ClientProxyFactoryService],
})
export class OrderModule {}
