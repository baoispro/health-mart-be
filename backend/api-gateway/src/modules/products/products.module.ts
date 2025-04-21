import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { PharmacyStockController } from './controllers/pharmacy-stock.controller';
import { PharmacyStockService } from './services/pharmacy-stock.service';
import { SideEffectController } from './controllers/side-effect.controller';
import { SideEffectService} from './services/side-effect.service'
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';


@Module({
  controllers: [ProductsController, PharmacyStockController, SideEffectController],
  providers: [ProductsService, PharmacyStockService, SideEffectService, ClientProxyFactoryService]
})
export class ProductsModule {}
