import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Ingredient } from '../ingredients/entities/ingredient.entity';

import { SideEffect } from '../side_effect/entities/side_effect.entity';
import { Precaution } from '../precautions/entities/precaution.entity';
import { PharmacyStock } from '../pharmacy_stock/entities/pharmacy_stock.entity';
import { Category } from '../categories/entities/category.entity';
import { Usage } from '../usages/entities/usage.entity';
import { Dosage } from '../dosages/entities/dosage.entity';
import { Storage } from '../storages/entities/storage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Category,
      Ingredient,
      Usage,
      Dosage,
      SideEffect,
      Precaution,
      Storage,
      PharmacyStock,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
