import { Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { CreateReviewRequest } from '../dto/requests/create-review-request.dto';
import { UpdateReviewRequest } from '../dto/requests/update-review-request.dto';

@Injectable()
export class ReviewService {
  private readonly reviewClient: ClientProxy;

  constructor(
    private readonly clientProxyFactory: ClientProxyFactoryService,
  ) {
    this.reviewClient = this.clientProxyFactory.createClient('reviewService');
  }

  private handleError = catchError((error) =>
    throwError(() => new RpcException(error.response || error.message)),
  );

  async create(createDto: CreateReviewRequest) {
    try {
      return await firstValueFrom(
        this.reviewClient
          .send({ cmd: 'create_review' }, createDto)
          .pipe(this.handleError)
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await firstValueFrom(
      this.reviewClient
        .send({ cmd: 'get_all_reviews' }, {})
        .pipe(this.handleError)
    );
  }

  async findOne(id: number) {
    try {
      return await firstValueFrom(
        this.reviewClient
          .send({ cmd: 'get_review_by_id' }, { id })
          .pipe(this.handleError)
      );
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateDto: UpdateReviewRequest) {
    try {
      return await firstValueFrom(
        this.reviewClient
          .send({ cmd: 'update_review' }, { id, updateRequest: updateDto })
          .pipe(this.handleError)
      );
    } catch (error) {
      throw error;
    }
  }

  async findByProductId(productId: number) {
    try {
      return await firstValueFrom(
        this.reviewClient
          .send({ cmd: 'get_reviews_by_product_id' }, { productId })
          .pipe(this.handleError)
      );
    } catch (error) {
      throw error;
    }
  }

  async findByUserId(userId: number) {
    try {
      return await firstValueFrom(
        this.reviewClient
          .send({ cmd: 'get_reviews_by_user_id' }, { userId })
          .pipe(this.handleError)
      );
    } catch (error) {
      throw error;
    }
  }

  async getRating(rating: number){
    try {
      return await firstValueFrom(
        this.reviewClient
        .send({ cmd: 'rating_review'}, {rating})
        .pipe(this.handleError)
      );
    } catch (error){
      throw error;
    }
  }
}
