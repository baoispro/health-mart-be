import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Storage } from './entities/storage.entity';
import { StoragesController } from './controllers/storages.controller';
import { StoragesService } from './services/storages.service';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Storage])],
  controllers: [StoragesController],
  providers: [StoragesService],
})
export class StoragesModule {}
