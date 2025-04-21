import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ReviewService } from '../services/review.service';
import { CreateReviewRequest } from '../dto/requests/create-review-request.dto';
import { UpdateReviewRequest } from '../dto/requests/update-review-request.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { BaseResponseDto } from '../dto/responses/base-response.dto';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
  ) {}

  // Lấy tất cả đánh giá
  @Get()
  @ApiOperation({ summary: 'Lấy tất cả đánh giá' })
  @ApiResponse({ 
    status: 200, 
    description: 'Danh sách đánh giá',
    type: BaseResponseDto 
  })
  @ResponseMessage('Lấy danh sách đánh giá thành công')
  async getAllReviews() {
    return this.reviewService.findAll();
  }

  // Lấy đánh giá theo ID
  @Get(':id')
  @ApiOperation({ summary: 'Lấy đánh giá theo ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ 
    status: 200, 
    description: 'Chi tiết đánh giá',
    type: BaseResponseDto 
  })
  @ResponseMessage('Lấy đánh giá thành công')
  async getReviewById(@Param('id') id: number) {
     return this.reviewService.findOne(id);
  }

  // Tạo mới đánh giá
  @Post()
  @ApiOperation({ summary: 'Tạo mới đánh giá' })
  @ApiBody({ type: CreateReviewRequest })
  @ApiResponse({ 
    status: 201, 
    description: 'Tạo đánh giá thành công',
    type: BaseResponseDto 
  })
  @ResponseMessage('Tạo đánh giá thành công')
  async createReview(@Body() createDto: CreateReviewRequest) {
     return this.reviewService.create(createDto);
  }

  // Cập nhật đánh giá
  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật đánh giá' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateReviewRequest })
  @ApiResponse({ 
    status: 200, 
    description: 'Cập nhật đánh giá thành công',
    type: BaseResponseDto 
  })
  @ResponseMessage('Cập nhật đánh giá thành công')
  async updateReview(
    @Param('id') id: number,
    @Body() updateDto: UpdateReviewRequest,
  ) {
     return this.reviewService.update(id, updateDto);
  }

  // Lấy theo productId
  @Get('product/:productId')
  @ApiOperation({ summary: 'Lấy đánh giá theo sản phẩm' })
  @ApiParam({ name: 'productId', type: Number })
  @ApiResponse({ 
    status: 200, 
    description: 'Danh sách đánh giá theo sản phẩm',
    type: BaseResponseDto 
  })
  @ResponseMessage('Lấy đánh giá theo sản phẩm thành công')
  async getReviewsByProductId(@Param('productId') productId: number) {
    return this.reviewService.findByProductId(productId);
  }

  // Lấy theo userId
  @Get('user/:userId')
  @ApiOperation({ summary: 'Lấy đánh giá theo người dùng' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ 
    status: 200, 
    description: 'Danh sách đánh giá theo người dùng',
    type: BaseResponseDto 
  })
  @ResponseMessage('Lấy đánh giá theo người dùng thành công')
  async getReviewsByUserId(@Param('userId') userId: number) {
    return this.reviewService.findByUserId(userId);
  }

  // Lấy đánh giá theo Rating
  @Get('by-rating/:rating')
  @ApiOperation({ summary: 'Lấy đánh giá theo rating' })
  @ApiParam({ name: 'rating', type: Number })
  @ApiResponse({ 
    status: 200, 
    description: 'Danh sách đánh giá theo số sao',
    type: BaseResponseDto, // có thể custom nếu cần cụ thể hóa
  })
  @ResponseMessage('Lấy đánh giá theo rating thành công')
  async getReviewByRating(@Param('rating') rating: number) {
    return this.reviewService.getRating(rating);
}

}
