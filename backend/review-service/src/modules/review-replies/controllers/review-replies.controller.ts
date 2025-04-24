import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateReviewReplyRequest } from '../dto/create-review-reply-request.dto';
import { UpdateReviewReplyRequest } from '../dto/update-review-reply-request.dto';
import { ReviewReply } from '../entities/review-replies.entity';
import { ReviewReplyService } from '../services/review-replies.service';

@Controller('review-replies')
export class ReviewReplyController {
  constructor(private readonly reviewReplyService: ReviewReplyService) {}

  @MessagePattern({ cmd: 'reviewReply_create' })
  async create(
    @Payload() data: CreateReviewReplyRequest,
  ): Promise<ReviewReply> {
    return this.reviewReplyService.createReply(data);
  }

  @MessagePattern({ cmd: 'reviewReply_findAll' })
  async findAll(): Promise<ReviewReply[]> {
    return this.reviewReplyService.findAll();
  }

  @MessagePattern({ cmd: 'reviewReply_findOne' })
  async findOne(@Payload() id: number): Promise<ReviewReply> {
    return this.reviewReplyService.findOne(id);
  }

  @MessagePattern({ cmd: 'reviewReply_update' })
  async update(
    @Payload() data: { id: number; updateRequest: UpdateReviewReplyRequest },
  ): Promise<ReviewReply> {
    return this.reviewReplyService.updateReply(data.id, data.updateRequest);
  }
}
