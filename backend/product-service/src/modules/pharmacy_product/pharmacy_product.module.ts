import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { PharmacyProduct } from './entities/pharmacy_product.entity';
import { PharmacyProductController } from './controllers/pharmacy_product.controller';
import { PharmacyProductService } from './services/pharmacy_product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, PharmacyProduct])],
  controllers: [PharmacyProductController],
  providers: [PharmacyProductService],
})
export class PharmacyProductsModule {}
