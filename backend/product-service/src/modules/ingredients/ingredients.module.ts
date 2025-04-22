import { Module } from '@nestjs/common';
import { IngredientController } from './controllers/ingredient.controller';
import { IngredientService } from './services/ingredient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { Ingredient } from './entities/ingredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Ingredient])],
  controllers: [IngredientController],
  providers: [IngredientService],
})
export class IngredientsModule {}
