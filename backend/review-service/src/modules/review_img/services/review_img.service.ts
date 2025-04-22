import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../../reviews/entities/review.entity';
import { ReviewImage } from '../entities/review_img.entity';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ReviewImgService {
  private readonly logger = new Logger(ReviewImgService.name);

  constructor(
    @InjectRepository(ReviewImage)
    private readonly reviewImgRepository: Repository<ReviewImage>,

    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async findAll(): Promise<ReviewImage[]> {
    return this.reviewImgRepository.find({
      relations: ['review'],
    });
  }

  async createReviewImg(data: { reviewId: number; img_url: string }): Promise<ReviewImage> {
    const review = await this.reviewRepository.findOne({
      where: { id: data.reviewId },
    });

    if (!review) {
      throw new RpcException(new NotFoundException(`Review ${data.reviewId} không tồn tại`));
    }

    const newReviewImg = this.reviewImgRepository.create({
      img_url: data.img_url,
      review,
    });

    return this.reviewImgRepository.save(newReviewImg);
  }

  async findOne(id: number): Promise<ReviewImage> {
    const image = await this.reviewImgRepository.findOne({
      where: { id },
      relations: ['review'],
    });
  
    if (!image) {
      throw new RpcException(
        new NotFoundException(`Review image ${id} không tồn tại`),
      );
    }
  
    return image;
  }
  
  async updateReviewImg(id: number, data: { img_url?: string }): Promise<ReviewImage> {
    const image = await this.findOne(id);
  
    await this.reviewImgRepository.update(id, {
      ...image,
      ...data,
    });
  
    return this.findOne(id);
  }
  
}
