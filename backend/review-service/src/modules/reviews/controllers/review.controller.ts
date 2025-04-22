import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReviewService } from '../services/review.service';
import { Review } from '../entities/review.entity';
import { CreateReviewRequest } from '../dto/requests/create-review-request.dto';
import { UpdateReviewRequest } from '../dto/requests/update-revies-request.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @MessagePattern({ cmd: 'create_review' })
  async create(@Payload() createRequest: CreateReviewRequest): Promise<Review> {
    return this.reviewService.createReview(createRequest);
  }

  @MessagePattern({ cmd: 'get_all_reviews' })
  async findAll(): Promise<Review[]> {
    return this.reviewService.findAll();
  }

  @MessagePattern({ cmd: 'get_review_by_id' })
  async findOne(@Payload() data: { id: number }): Promise<Review> {
    return this.reviewService.findOne(data.id);
  }

  @MessagePattern({ cmd: 'get_reviews_by_product_id' })
  async findByProductId(
    @Payload() data: { productId: number },
  ): Promise<Review[]> {
    return this.reviewService.getReviewsProduct(data.productId);
  }

  @MessagePattern({ cmd: 'get_reviews_by_user_id' })
  async findByUserId(@Payload() data: { userId: number }): Promise<Review[]> {
    return this.reviewService.getReviewsByUser(data.userId);
  }

  @MessagePattern({ cmd: 'update_review' })
  async update(
    @Payload() data: { id: number; updateRequest: UpdateReviewRequest },
  ): Promise<Review> {
    return this.reviewService.updateReview(data.id, data.updateRequest);
  }

  @MessagePattern({ cmd: 'rating_review' })
  async getRating(@Payload() data: { rating: number }): Promise<Review[]> {
    return this.reviewService.getRating(data.rating);
  }
}
