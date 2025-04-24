import { DeleteResult } from 'typeorm';
import { CreateCategoryRequest } from '../dto/requests/create-category-request.dto';
import { UpdateCategoryRequest } from '../dto/requests/update-category-request.dto';
import { Category } from '../entities/category.entity';

export interface CategoryService {
  create(createCategoryRequest: CreateCategoryRequest): Promise<Category>;
  findAll(): Promise<Category[]>;
  findOne(id: number): Promise<Category>;
  update(
    id: number,
    updateCategoryRequest: UpdateCategoryRequest,
  ): Promise<Category>;
  remove(id: number): Promise<DeleteResult>;
}
