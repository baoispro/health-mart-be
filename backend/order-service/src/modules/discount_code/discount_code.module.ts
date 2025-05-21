import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountCode } from './entities/discount_code.entity';
import { DiscountCodesService } from './services/discount_code.service';
import { DiscountCodesController } from './controllers/discount_code.controller';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountCode])],
  controllers: [DiscountCodesController],
  providers: [DiscountCodesService, ClientProxyFactoryService],
})
export class DiscountCodesModule {}
