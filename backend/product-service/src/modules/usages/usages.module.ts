import { Module } from '@nestjs/common';
import { UsagesController } from './controllers/usages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsagesService } from './services/usages.service';
import { Usage } from './entities/usage.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usage, Product])],
  controllers: [UsagesController],
  providers: [UsagesService],
})
export class UsagesModule {}
