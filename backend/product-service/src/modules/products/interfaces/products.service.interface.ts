import { DeleteResult } from 'typeorm';
import { CreateProductRequest } from '../dto/requests/create-product-request.dto';
import { UpdateProductRequest } from '../dto/requests/update-product-request.dto';
import { Product } from '../entities/product.entity';

export interface ProductService {
  create(createProductRequest: CreateProductRequest): Promise<Product>;
  findAll(queryParams: { name?: string }): Promise<Product[]>;
  findOne(id: number): Promise<Product>;
  update(
    id: number,
    updateProductRequest: UpdateProductRequest,
  ): Promise<Product>;
  remove(id: number): Promise<DeleteResult>;
}
