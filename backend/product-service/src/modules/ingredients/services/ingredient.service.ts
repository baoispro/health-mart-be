import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Ingredient } from '../entities/ingredient.entity';
import { Product } from '../../products/entities/product.entity';
import { RpcException } from '@nestjs/microservices';
import { CreateIngredientRequest } from '../dto/requests/create-ingredients-request.dto';
import { UpdateIngredientRequest } from '../dto/requests/update-ingredients-request.dto';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createRequest: CreateIngredientRequest): Promise<Ingredient> {
    const product = await this.productRepository.findOne({
      where: { product_id: createRequest.product_id },
    });
    if (!product) {
      throw new RpcException(
        new NotFoundException(
          `Product ${createRequest.product_id} không tồn tại!`,
        ),
      );
    }
    const newIngredient = this.ingredientRepository.create({
      ...createRequest,
      product,
    });
    return await this.ingredientRepository.save(newIngredient);
  }

  async findAll(): Promise<Ingredient[]> {
    return await this.ingredientRepository.find({ relations: ['product'] });
  }

  async findByProduct(productId: number): Promise<Ingredient[]> {
    return await this.ingredientRepository.find({
      where: { product: { product_id: productId } },
      relations: ['product'],
    });
  }

  async findOne(id: number): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository.findOne({
      where: { ingredient_id: id },
      relations: ['product'],
    });
    if (!ingredient) {
      throw new RpcException(
        new NotFoundException(`Ingredient ${id} không tồn tại!`),
      );
    }
    return ingredient;
  }

  async update(
    id: number,
    updateRequest: UpdateIngredientRequest,
  ): Promise<Ingredient> {
    const ingredient = await this.findOne(id);
    Object.assign(ingredient, updateRequest);
    return await this.ingredientRepository.save(ingredient);
  }

  async remove(id: number): Promise<DeleteResult> {
    const result = await this.ingredientRepository.delete({
      ingredient_id: id,
    });
    if (result.affected === 0) {
      throw new RpcException(
        new NotFoundException(`Không tìm thấy Ingredient với id ${id}`),
      );
    }
    return result;
  }
}
