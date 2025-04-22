import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { ReviewImgService } from '../services/review_img.service'
import { BaseResponseDto } from '../dto/responses/base-response.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { UpdateReviewImgRequest } from '../dto/requests/update-reviewimg-request.dto';
import { CreateReviewImgRequest } from '../dto/requests/create-reviewimg-request.dto';

@ApiTags('Review Image')
@Controller('review-images')
export class ReviewImgController {
  constructor(private readonly reviewImgService: ReviewImgService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả hình ảnh đánh giá' })
  @ResponseMessage('Lấy danh sách hình ảnh đánh giá thành công')
  async getAll() {
    return this.reviewImgService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết hình ảnh đánh giá' })
  @ResponseMessage('Lấy chi tiết hình ảnh đánh giá thành công')
  async getById(@Param('id') id: number) {
    return this.reviewImgService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo mới hình ảnh đánh giá' })
  @ResponseMessage('Tạo hình ảnh đánh giá thành công')
  async create(@Body() data: CreateReviewImgRequest) {
    return this.reviewImgService.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật hình ảnh đánh giá' })
  @ResponseMessage('Cập nhật hình ảnh đánh giá thành công')
  async update(
    @Param('id') id: number,
    @Body() updateData: UpdateReviewImgRequest,
  ) {
    return this.reviewImgService.update(+id, updateData);
  }
}