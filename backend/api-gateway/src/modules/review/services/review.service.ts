import { Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { CreateReviewRequest } from '../dto/requests/create-review-request.dto';
import { UpdateReviewRequest } from '../dto/requests/update-review-request.dto';
import { CreateReviewReplyRequest } from '../dto/requests/create-review-reply-request.dto';
import { UpdateReviewReplyRequest } from '../dto/requests/update-review-reply-request.dto';
import { UpdateReviewImgRequest } from '../dto/requests/update-reviewimg-request.dto';

@Injectable()
export class ReviewService {
  private readonly reviewClient: ClientProxy;

  constructor(private readonly clientProxyFactory: ClientProxyFactoryService) {
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
          .pipe(this.handleError),
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await firstValueFrom(
      this.reviewClient
        .send({ cmd: 'get_all_reviews' }, {})
        .pipe(this.handleError),
    );
  }

  async findOne(id: number) {
    try {
      return await firstValueFrom(
        this.reviewClient
          .send({ cmd: 'get_review_by_id' }, { id })
          .pipe(this.handleError),
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
          .pipe(this.handleError),
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
          .pipe(this.handleError),
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
          .pipe(this.handleError),
      );
    } catch (error) {
      throw error;
    }
  }

  async getRating(rating: number) {
    try {
      return await firstValueFrom(
        this.reviewClient
          .send({ cmd: 'rating_review' }, { rating })
          .pipe(this.handleError),
      );
    } catch (error) {
      throw error;
    }
  }

  // Thêm các hàm mới vào ReviewService:

  async createReply(createDto: CreateReviewReplyRequest) {
    try {
      return await firstValueFrom(
        this.reviewClient
          .send({ cmd: 'reviewReply_create' }, createDto)
          .pipe(this.handleError),
      );
    } catch (error) {
      throw error;
    }
  }

  async findAllReplies() {
    return await firstValueFrom(
      this.reviewClient
        .send({ cmd: 'reviewReply_findAll' }, {})
        .pipe(this.handleError),
    );
  }

  async findReplyById(id: number) {
    try {
      return await firstValueFrom(
        this.reviewClient
          .send({ cmd: 'reviewReply_findOne' }, id)
          .pipe(this.handleError),
      );
    } catch (error) {
      throw error;
    }
  }

  async updateReply(id: number, updateDto: UpdateReviewReplyRequest) {
    try {
      return await firstValueFrom(
        this.reviewClient
          .send({ cmd: 'reviewReply_update' }, { id, updateRequest: updateDto })
          .pipe(this.handleError),
      );
    } catch (error) {
      throw error;
    }
  }

  // ==== REVIEW IMAGE ====

  async findAllImages() {
    return await firstValueFrom(
      this.reviewClient
        .send({ cmd: 'reviewImg_findAll' }, {})
        .pipe(this.handleError),
    );
  }

  async createImage(data: any) {
    return await firstValueFrom(
      this.reviewClient
        .send({ cmd: 'reviewImg_create' }, data)
        .pipe(this.handleError),
    );
  }

  async findImageById(id: number) {
    return await firstValueFrom(
      this.reviewClient
        .send({ cmd: 'reviewImg_findOne' }, id)
        .pipe(this.handleError),
    );
  }

  async updateImage(id: number, updateData: UpdateReviewImgRequest) {
    return await firstValueFrom(
      this.reviewClient
        .send({ cmd: 'reviewImg_update' }, { id, updateRequest: updateData })
        .pipe(this.handleError),
    );
  }
}
