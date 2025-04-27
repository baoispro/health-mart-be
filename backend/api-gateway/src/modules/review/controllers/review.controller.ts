import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { ReviewService } from '../services/review.service';
import { CreateReviewRequest } from '../dto/requests/create-review-request.dto';
import { UpdateReviewRequest } from '../dto/requests/update-review-request.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { BaseResponseDto } from '../../order/dto/responses/base-response.dto';
import { UpdateReviewReplyRequest } from '../dto/requests/update-review-reply-request.dto';
import { CreateReviewReplyRequest } from '../dto/requests/create-review-reply-request.dto';
import { CreateReviewImgRequest } from '../dto/requests/create-reviewimg-request.dto';
import { UpdateReviewImgRequest } from '../dto/requests/update-reviewimg-request.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // Lấy tất cả đánh giá
  @Get()
  @ApiOperation({ summary: 'Lấy tất cả đánh giá' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách đánh giá',
    type: BaseResponseDto,
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
    type: BaseResponseDto,
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
    type: BaseResponseDto,
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
    type: BaseResponseDto,
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
    type: BaseResponseDto,
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
    type: BaseResponseDto,
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

  // Lấy tất cả phản hồi
  @Get('/reply')
  @ApiOperation({ summary: 'Lấy tất cả phản hồi' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách phản hồi',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy danh sách phản hồi thành công')
  async getAllReplies() {
    return this.reviewService.findAllReplies();
  }

  // Lấy phản hồi theo ID
  @Get('/reply/:id')
  @ApiOperation({ summary: 'Lấy phản hồi theo ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Chi tiết phản hồi',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy phản hồi thành công')
  async getReplyById(@Param('id') id: number) {
    return this.reviewService.findReplyById(id);
  }

  // Tạo phản hồi mới
  @Post('/reply')
  @ApiOperation({ summary: 'Tạo mới phản hồi cho đánh giá' })
  @ApiBody({ type: CreateReviewReplyRequest })
  @ApiResponse({
    status: 201,
    description: 'Tạo phản hồi thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Tạo phản hồi thành công')
  async createReply(@Body() createDto: CreateReviewReplyRequest) {
    return this.reviewService.createReply(createDto);
  }

  // Cập nhật phản hồi
  @Put('/reply/:id')
  @ApiOperation({ summary: 'Cập nhật phản hồi' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateReviewReplyRequest })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật phản hồi thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Cập nhật phản hồi thành công')
  async updateReply(
    @Param('id') id: number,
    @Body() updateDto: UpdateReviewReplyRequest,
  ) {
    return this.reviewService.updateReply(id, updateDto);
  }

  // ===== REVIEW IMAGE =====

  @Get('/image')
  @ApiOperation({ summary: 'Lấy tất cả ảnh đánh giá' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách ảnh đánh giá',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy tất cả ảnh đánh giá thành công')
  async getAllReviewImages() {
    return this.reviewService.findAllImages();
  }

  @Post('/image')
  @UseInterceptors(FileInterceptor('image_url'))
  @ApiOperation({ summary: 'Tạo ảnh đánh giá mới' })
  @ApiBody({ type: CreateReviewImgRequest })
  @ApiResponse({
    status: 201,
    description: 'Tạo ảnh đánh giá thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Tạo ảnh đánh giá thành công')
  async createReviewImage(
    @Body() createDto: CreateReviewImgRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const payload = {
      ...createDto,
      avatarFile: file
        ? {
            originalname: file.originalname,
            mimetype: file.mimetype,
            buffer: Array.from(file.buffer), // Chuyển Buffer sang JSON để truyền qua RabbitMQ
          }
        : null,
    };
    return this.reviewService.createImage(payload);
  }

  @Get('/image/:id')
  @ApiOperation({ summary: 'Lấy ảnh đánh giá theo ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Chi tiết ảnh đánh giá',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy ảnh đánh giá thành công')
  async getReviewImageById(@Param('id') id: number) {
    return this.reviewService.findImageById(id);
  }

  @Put('/image/:id')
  @ApiOperation({ summary: 'Cập nhật ảnh đánh giá' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateReviewImgRequest })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật ảnh đánh giá thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Cập nhật ảnh đánh giá thành công')
  async updateReviewImage(
    @Param('id') id: number,
    @Body() updateDto: UpdateReviewImgRequest,
  ) {
    return this.reviewService.updateImage(id, updateDto);
  }
}
