import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dosage } from './entities/dosage.entity';
import { DosagesController } from './controllers/dosages.controller';
import { DosagesService } from './services/dosages.service';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dosage, Product])],
  controllers: [DosagesController],
  providers: [DosagesService],
})
export class DosagesModule {}
