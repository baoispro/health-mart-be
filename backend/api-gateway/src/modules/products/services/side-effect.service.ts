import { Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { CreateSideEffectRequest } from '../dto/requests/create-sideEffect-request.dto';
import { UpdateSideEffectRequest } from '../dto/requests/update-sideEffect-request.dto';

@Injectable()
export class SideEffectService {
  private readonly sideEffectClient: ClientProxy;

  constructor(private readonly clientProxyFactory: ClientProxyFactoryService) {
    this.sideEffectClient = this.clientProxyFactory.createClient('productService');
  }

  private handleError = catchError((error) =>
    throwError(() => new RpcException(error.response || error.message)),
  );

  getAllSideEffects() {
    return this.sideEffectClient
      .send('get_all_side_effects', {})
      .pipe(this.handleError);
  }

  getSideEffectsByProduct(productId: number) {
    return this.sideEffectClient
      .send('get_side_effects_by_product', productId)
      .pipe(this.handleError);
  }

  createSideEffect(createRequest: CreateSideEffectRequest) {
    return this.sideEffectClient
      .send('create_side_effect', createRequest)
      .pipe(this.handleError);
  }

  updateSideEffect(id: number, updateRequest: UpdateSideEffectRequest) {
    return this.sideEffectClient
      .send('update_side_effect', { id, updateRequest })
      .pipe(this.handleError);
  }

  deleteSideEffect(id: number) {
    return this.sideEffectClient
      .send('delete_side_effect', id)
      .pipe(this.handleError);
  }
}
