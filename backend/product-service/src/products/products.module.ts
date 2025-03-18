import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { Ingredient } from './entities/ingredient.entity';
import { Usage } from './entities/usage.entity';
import { Dosage } from './entities/dosage.entity';
import { SideEffect } from './entities/side-effect.entity';
import { Precaution } from './entities/precaution.entity';
import { Storage as StorageEntity } from './entities/storage.entity';
import { PharmacyStock } from './entities/pharmacy-stock.entity';

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
      StorageEntity,
      PharmacyStock
    ])
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
