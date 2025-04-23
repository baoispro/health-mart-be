import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { PharmacyStockController } from './controllers/pharmacy-stock.controller';
import { PharmacyStockService } from './services/pharmacy-stock.service';
import { SideEffectController } from './controllers/side-effect.controller';
import { SideEffectService } from './services/side-effect.service';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';

@Module({
  controllers: [
    ProductsController,
    PharmacyStockController,
    SideEffectController,
    CategoriesController,
  ],
  providers: [
    ProductsService,
    PharmacyStockService,
    SideEffectService,
    CategoriesService ,
    ClientProxyFactoryService,
  ],
})
export class ProductsModule {}
