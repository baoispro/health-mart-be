import { Module } from '@nestjs/common';
import { PrecautionController } from './controllers/precaution.controller';
import { PrecautionService } from './services/preacaution.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { Precaution } from './entities/precaution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Precaution])],
  controllers: [PrecautionController],
  providers: [PrecautionService],
})
export class PrecationsModule {}
