// side-effect.module.ts
import { Module } from '@nestjs/common';
import { SideEffectController } from './controllers/side_effect.controller';
import { SideEffectService } from './services/side_effect.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { SideEffect } from './entities/side_effect.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, SideEffect])],
  controllers: [SideEffectController],
  providers: [SideEffectService],
})
export class SideEffectModule {}
