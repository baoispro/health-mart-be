import { DeleteResult } from 'typeorm';
import { Ingredient } from '../entities/ingredient.entity';
import { CreateIngredientRequest } from '../dto/requests/create-ingredients-request.dto';
import { UpdateIngredientRequest } from '../dto/requests/update-ingredients-request.dto';

export interface IngredientService {
  create(createRequest: CreateIngredientRequest): Promise<Ingredient>;
  findAll(): Promise<Ingredient[]>;
  findByProduct(productId: number): Promise<Ingredient[]>;
  findOne(id: number): Promise<Ingredient>;
  update(
    id: number,
    updateRequest: UpdateIngredientRequest,
  ): Promise<Ingredient>;
  remove(id: number): Promise<DeleteResult>;
}
