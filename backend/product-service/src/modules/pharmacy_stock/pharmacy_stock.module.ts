import { Module } from '@nestjs/common';
import { PharmacyStockController } from './controllers/pharmacy_stock.controller';
import { PharmacyStockService } from './services/pharmacy_stock.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { PharmacyStock } from './entities/pharmacy_stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, PharmacyStock])],
  controllers: [PharmacyStockController],
  providers: [PharmacyStockService],
})
export class PharmacyStocksModule {}
