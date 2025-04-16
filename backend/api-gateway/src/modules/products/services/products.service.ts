import { Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';
import { instanceToPlain } from 'class-transformer';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { CreateProductRequest } from '../dto/requests/create-product-request.dto';
import { UpdateProductRequest } from '../dto/requests/update-product-request.dto';

@Injectable()
export class ProductsService {
  private readonly productClient: ClientProxy;

  constructor(
    private readonly clientProxyFactory: ClientProxyFactoryService,
  ) {
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
    return this.productClient
      .send('delete_product', id)
      .pipe(this.handleError);
  }
}
