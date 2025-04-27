import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReviewService {
  private readonly logger = new Logger(ReviewService.name);
  private userClient: ClientProxy;
  private productClient: ClientProxy;

  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly clientProxyFactory: ClientProxyFactoryService,
  ) {
    this.userClient = this.clientProxyFactory.createClient('userService');
    this.productClient = this.clientProxyFactory.createClient('productService');
  }

  async findAll(): Promise<Review[]> {
    return this.reviewRepository.find({ relations: ['images', 'replies'] });
  }

  async createReview(reviewData: Partial<Review>): Promise<Review> {
    const user_id = Number(reviewData.userId);
    if (!user_id) {
      throw new RpcException(new NotFoundException('Thiếu userId'));
    }

    const userExists = await this.checkUserExists(user_id);
    if (!userExists) {
      throw new RpcException(
        new NotFoundException(`User ${user_id} không tồn tại`),
      );
    }

    const product_id = Number(reviewData.productId);
    if (!product_id) {
      throw new RpcException(new NotFoundException('Thiếu productId'));
    }

    const productExists = await this.checkProductExists(product_id);
    if (!productExists) {
      throw new RpcException(
        new NotFoundException(`Product ${product_id} không tồn tại`),
      );
    }

    const existingReview = await this.reviewRepository.findOne({
      where: {
        userId: user_id,
        productId: product_id,
      },
    });

    if (existingReview) {
      throw new RpcException(
        new ConflictException(
          `User ${user_id} đã review sản phẩm ${product_id} rồi.`,
        ),
      );
    }
    // Tạo review mới
    const newReview = this.reviewRepository.create({
      ...reviewData,
      userId: user_id,
      productId: product_id,
    });

    return this.reviewRepository.save(newReview);
  }

  // Cập nhật review
  async updateReview(reviewId: number, data: Partial<Review>): Promise<Review> {
    const review = await this.findOne(reviewId);

    const updatedReview = {
      ...review,
      ...data,
    };

    await this.reviewRepository.update(reviewId, updatedReview);

    return this.reviewRepository.findOne({
      where: { id: reviewId },
      // relations: ['product', 'user'],
    });
  }

  // Lấy 1 review theo id
  async findOne(reviewId: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
      // relations: ['user'],
    });

    if (!review) {
      throw new RpcException(
        new NotFoundException(`Review ${reviewId} không tồn tại`),
      );
    }

    return review;
  }

  // Lấy danh sách review theo user
  async getReviewsByUser(userId: number): Promise<Review[]> {
    const userExists = await this.checkUserExists(userId);
    if (!userExists) {
      throw new RpcException(
        new NotFoundException(`User ${userId} không tồn tại`),
      );
    }

    const reviews = await this.reviewRepository.find({
      where: { userId: userId },
    });

    return reviews;
  }

  // Lấy danh sách review theo sản phẩm
  async getReviewsProduct(productId: number): Promise<Review[]> {
    const productExists = await this.checkProductExists(productId);
    if (!productExists) {
      throw new RpcException(
        new NotFoundException(`Product ${productId} không tồn tại`),
      );
    }

    const reviews = await this.reviewRepository.find({
      where: { productId: productId },
    });

    return reviews;
  }

  // Lấy danh sách đánh giá theo số sao (rating)
  async getRating(rating: number): Promise<Review[]> {
    const reviews = await this.reviewRepository.find({
      where: { rating },
    });

    if (!reviews || reviews.length === 0) {
      throw new RpcException(
        new NotFoundException(`Không có đánh giá nào với số sao ${rating}`),
      );
    }

    return reviews;
  }

  private async checkUserExists(user_id: number): Promise<boolean> {
    try {
      const result = await firstValueFrom(
        this.userClient.send('check_user_exists', { user_id }),
      );
      return result;
    } catch (error) {
      this.logger.error(`Lỗi kiểm tra user: ${error.message}`);
      return false;
    }
  }

  private async checkProductExists(productId: number): Promise<boolean> {
    try {
      const result = await firstValueFrom(
        this.productClient.send('check_product_exist', productId),
      );
      return result;
    } catch (error) {
      this.logger.error(`Lỗi khi kiểm tra product: ${error.message}`);
      return false;
    }
  }
}
