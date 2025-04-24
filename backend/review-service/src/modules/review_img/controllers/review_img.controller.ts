import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReviewImgService } from '../services/review_img.service';
import { ReviewImage } from '../entities/review_img.entity';
import { UpdateReviewImgRequest } from '../dto/update-reviewimg-request.dto';
import { CreateReviewImgRequest } from '../dto/create-reviewimg-request.dto';

@Controller('review-images')
export class ReviewImgController {
  constructor(private readonly reviewImgService: ReviewImgService) {}

  @MessagePattern({ cmd: 'reviewImg_create' })
  async create(@Payload() data: CreateReviewImgRequest): Promise<ReviewImage> {
    return this.reviewImgService.createReviewImg(data);
  }

  @MessagePattern({ cmd: 'reviewImg_findAll' })
  async findAll(): Promise<ReviewImage[]> {
    return this.reviewImgService.findAll();
  }

  @MessagePattern({ cmd: 'reviewImg_findOne' })
  async findOne(@Payload() id: number): Promise<ReviewImage> {
    return this.reviewImgService.findOne(id);
  }

  @MessagePattern({ cmd: 'reviewImg_update' })
  async update(
    @Payload() data: { id: number; updateRequest: UpdateReviewImgRequest },
  ): Promise<ReviewImage> {
    return this.reviewImgService.updateReviewImg(data.id, data.updateRequest);
  }
}
