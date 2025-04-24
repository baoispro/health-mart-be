import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../../reviews/entities/review.entity';
import { RpcException } from '@nestjs/microservices';
import { ReviewReply } from 'src/modules/review-replies/entities/review-replies.entity';

@Injectable()
export class ReviewReplyService {
  private readonly logger = new Logger(ReviewReplyService.name);

  constructor(
    @InjectRepository(ReviewReply)
    private readonly reviewReplyRepository: Repository<ReviewReply>,

    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async findAll(): Promise<ReviewReply[]> {
    return this.reviewReplyRepository.find({
      relations: ['review'],
    });
  }

  async findOne(id: number): Promise<ReviewReply> {
    const reply = await this.reviewReplyRepository.findOne({
      where: { id },
      relations: ['review'],
    });

    if (!reply) {
      throw new RpcException(
        new NotFoundException(`Phản hồi ${id} không tồn tại`),
      );
    }

    return reply;
  }

  async createReply(data: {
    reviewId: number;
    staffId: number;
    replyText: string;
  }): Promise<ReviewReply> {
    const review = await this.reviewRepository.findOne({
      where: { id: data.reviewId },
    });

    if (!review) {
      throw new RpcException(
        new NotFoundException(`Review ${data.reviewId} không tồn tại`),
      );
    }

    const newReply = this.reviewReplyRepository.create({
      review,
      staffId: data.staffId,
      replyText: data.replyText,
    });

    return this.reviewReplyRepository.save(newReply);
  }

  async updateReply(
    id: number,
    data: { replyText?: string },
  ): Promise<ReviewReply> {
    const reply = await this.findOne(id);

    await this.reviewReplyRepository.update(id, {
      ...reply,
      ...data,
    });

    return this.findOne(id);
  }
}
