import { Module } from '@nestjs/common';
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
import { StoragesController } from './controllers/storages.controller';
import { StoragesService } from './services/storages.service';

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
      PharmacyStock,
    ]),
  ],
  controllers: [StoragesController],
  providers: [StoragesService],
})
export class StoragesModule {}
