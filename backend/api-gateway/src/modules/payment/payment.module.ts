import { Module } from '@nestjs/common';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { VnpayController } from './controllers/payment.controller';
import { VnpayService } from './services/payment.service';

@Module({
  controllers: [VnpayController],
  providers: [VnpayService, ClientProxyFactoryService],
})
export class PaymentModule {}
