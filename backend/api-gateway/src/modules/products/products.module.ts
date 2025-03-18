import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ClientProxyFactoryService]
})
export class ProductsModule {}
