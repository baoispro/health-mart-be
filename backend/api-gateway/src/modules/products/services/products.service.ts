import { Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';
import { instanceToPlain } from 'class-transformer';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { CreateProductRequest } from '../dto/requests/create-product-request.dto';
import { UpdateProductRequest } from '../dto/requests/update-product-request.dto';
import { CreateIngredientRequest } from '../dto/requests/create-ingredients-request.dto';
import { UpdateIngredientRequest } from '../dto/requests/update-ingredients-request.dto';
import { CreatePrecautionRequest } from '../dto/requests/create-precaution-request.dto';
import { UpdatePrecautionRequest } from '../dto/requests/update-precaution-request.dto';

@Injectable()
export class ProductsService {
  private readonly productClient: ClientProxy;

  constructor(private readonly clientProxyFactory: ClientProxyFactoryService) {
    this.productClient = this.clientProxyFactory.createClient('productService');
  }

  private handleError = catchError((error) =>
    throwError(() => new RpcException(error.response || error.message)),
  );

  getAllProducts() {
    return this.productClient
      .send('get_all_products', {})
      .pipe(this.handleError);
  }

  getProductById(id: number) {
    return this.productClient
      .send('get_product_by_id', id)
      .pipe(this.handleError);
  }

  createProduct(createProductRequest: CreateProductRequest) {
    const payload = instanceToPlain(createProductRequest);
    return this.productClient
      .send('create_product', payload)
      .pipe(this.handleError);
  }

  updateProduct(id: number, updateProductRequest: UpdateProductRequest) {
    const payload = instanceToPlain(updateProductRequest);
    return this.productClient
      .send('update_product', { id, updateProductRequest: payload })
      .pipe(this.handleError);
  }

  deleteProduct(id: number) {
    return this.productClient.send('delete_product', id).pipe(this.handleError);
  }

  getAllIngredients() {
    return this.productClient
      .send('get_all_ingredients', {})
      .pipe(this.handleError);
  }

  getIngredientById(id: number) {
    return this.productClient
      .send('get_ingredient_by_id', id)
      .pipe(this.handleError);
  }

  createIngredient(createRequest: CreateIngredientRequest) {
    const payload = instanceToPlain(createRequest);
    return this.productClient
      .send('create_ingredient', payload)
      .pipe(this.handleError);
  }

  updateIngredient(id: number, updateRequest: UpdateIngredientRequest) {
    const payload = instanceToPlain(updateRequest);
    return this.productClient
      .send('update_ingredient', { id, updateRequest: payload })
      .pipe(this.handleError);
  }

  deleteIngredient(id: number) {
    return this.productClient
      .send('delete_ingredient', id)
      .pipe(this.handleError);
  }

  getAllPrecautions() {
    return this.productClient
      .send('get_all_precautions', {})
      .pipe(this.handleError);
  }

  getPrecautionById(id: number) {
    return this.productClient
      .send('get_precaution_by_id', id)
      .pipe(this.handleError);
  }

  createPrecaution(createRequest: CreatePrecautionRequest) {
    const payload = instanceToPlain(createRequest);
    return this.productClient
      .send('create_precaution', payload)
      .pipe(this.handleError);
  }

  updatePrecaution(id: number, updateRequest: UpdatePrecautionRequest) {
    const payload = instanceToPlain(updateRequest);
    return this.productClient
      .send('update_precaution', { id, updateRequest: payload })
      .pipe(this.handleError);
  }

  deletePrecaution(id: number) {
    return this.productClient
      .send('delete_precaution', id)
      .pipe(this.handleError);
  }
}
