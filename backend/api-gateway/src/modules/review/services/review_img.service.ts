import { Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { UpdateReviewImgRequest } from '../dto/requests/update-reviewimg-request.dto';
import { CreateReviewImgRequest } from '../dto/requests/create-reviewimg-request.dto';

@Injectable()
export class ReviewImgService {
  private readonly reviewClient: ClientProxy;

  constructor(
    private readonly clientProxyFactory: ClientProxyFactoryService,
  ) {
    this.reviewClient = this.clientProxyFactory.createClient('reviewService');
  }

  private handleError = catchError((error) =>
    throwError(() => new RpcException(error.response || error.message)),
  );

  async findAll() {
    return await firstValueFrom(
      this.reviewClient
        .send({ cmd: 'reviewImg_findAll' }, {})
        .pipe(this.handleError)
    );
  }

  async create(data: CreateReviewImgRequest) {
    return await firstValueFrom(
      this.reviewClient
        .send({ cmd: 'reviewImg_create' }, data)
        .pipe(this.handleError)
    );
  }

  async findOne(id: number) {
    return await firstValueFrom(
      this.reviewClient
        .send({ cmd: 'reviewImg_findOne' }, id)
        .pipe(this.handleError)
    );
  }

  async update(id: number, updateData: UpdateReviewImgRequest) {
    return await firstValueFrom(
      this.reviewClient
        .send({ cmd: 'reviewImg_update' }, { id, updateRequest: updateData })
        .pipe(this.handleError)
    );
  }
}