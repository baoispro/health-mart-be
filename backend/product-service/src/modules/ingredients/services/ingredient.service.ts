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

  async createMany(createRequest: {
    product_id: number;
    ingredients: { name: string; concentration: string }[];
  }): Promise<Ingredient[]> {
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
    const newIngredients = createRequest.ingredients.map((item) =>
      this.ingredientRepository.create({
        ...item,
        product,
      }),
    );
    return await this.ingredientRepository.save(newIngredients);
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

  async updateMany(updateRequest: {
    product_id: number;
    ingredients: { name: string; concentration: string }[];
  }): Promise<Ingredient[]> {
    const product = await this.productRepository.findOne({
      where: { product_id: updateRequest.product_id },
    });

    if (!product) {
      throw new RpcException(
        new NotFoundException(
          `Product ${updateRequest.product_id} không tồn tại!`,
        ),
      );
    }

    const existingIngredients = await this.ingredientRepository.find({
      where: { product: { product_id: updateRequest.product_id } },
    });

    const existingMap = new Map<string, Ingredient>();
    for (const ing of existingIngredients) {
      existingMap.set(ing.name, ing);
    }

    const updatedOrCreated: Ingredient[] = [];

    for (const item of updateRequest.ingredients) {
      const existing = existingMap.get(item.name);
      if (existing) {
        existing.concentration = item.concentration;
        updatedOrCreated.push(existing);
        existingMap.delete(item.name); 
      } else {
        const newIngredient = this.ingredientRepository.create({
          name: item.name,
          concentration: item.concentration,
          product,
        });
        updatedOrCreated.push(newIngredient);
      }
    }

    const toDelete = Array.from(existingMap.values());
    if (toDelete.length > 0) {
      await this.ingredientRepository.remove(toDelete);
    }

    return await this.ingredientRepository.save(updatedOrCreated);
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
