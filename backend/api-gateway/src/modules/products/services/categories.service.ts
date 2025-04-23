import { Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';
import { instanceToPlain } from 'class-transformer';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { CreateCategoryRequest } from '../dto/requests/create-category-requests.dto';
import { UpdateCategoryRequest } from '../dto/requests/update-category-requests.dto';

@Injectable()
export class CategoriesService {
  private readonly categoryClient: ClientProxy;

  constructor(
    private readonly clientProxyFactory: ClientProxyFactoryService,
  ) {
    this.categoryClient = this.clientProxyFactory.createClient('productService');
  }

  private handleError = catchError((error) =>
    throwError(() => new RpcException(error.response || error.message)),
  );

  getAllCategories() {
    return this.categoryClient
      .send('get_all_categories', {})
      .pipe(this.handleError);
  }

  getCategoryById(id: number) {
    return this.categoryClient
      .send('get_category_by_id', id)
      .pipe(this.handleError);
  }

  createCategory(createCategoryRequest: CreateCategoryRequest) {
    const payload = instanceToPlain(createCategoryRequest);
    return this.categoryClient
      .send('create_category', payload)
      .pipe(this.handleError);
  }

  updateCategory(id: number, updateCategoryRequest: UpdateCategoryRequest) {
    const payload = instanceToPlain(updateCategoryRequest);
    return this.categoryClient
      .send('update_category', { id, updateCategoryRequest: payload })
      .pipe(this.handleError);
  }

  deleteCategory(id: number) {
    return this.categoryClient
      .send('delete_category', id)
      .pipe(this.handleError);
  }
}
