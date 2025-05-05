import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../../reviews/entities/review.entity';
import { ReviewImage } from '../entities/review_img.entity';
import { RpcException } from '@nestjs/microservices';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { CreateReviewImgRequest } from '../dto/create-reviewimg-request.dto';
import { UpdateReviewImgRequest } from '../dto/update-reviewimg-request.dto';

@Injectable()
export class ReviewImgService {
  private readonly logger = new Logger(ReviewImgService.name);
  private s3: S3Client;

  constructor(
    @InjectRepository(ReviewImage)
    private readonly reviewImgRepository: Repository<ReviewImage>,

    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  async findAll(): Promise<ReviewImage[]> {
    return this.reviewImgRepository.find({
      relations: ['review'],
    });
  }

  async createReviewImg(data: CreateReviewImgRequest): Promise<ReviewImage> {
    const review = await this.reviewRepository.findOne({
      where: { id: data.reviewId },
    });

    if (!review) {
      throw new RpcException(
        new NotFoundException(`Review ${data.reviewId} không tồn tại`),
      );
    }

    // Nếu có avatarFile thì upload lên S3
    let avatarUrl = data.img_url ?? 'https://example.com/avatar.png'; // default
    if (data.avatarFile) {
      avatarUrl = await this.uploadToS3(data.avatarFile); // bạn cần viết hàm này
    }

    const newReviewImg = this.reviewImgRepository.create({
      img_url: avatarUrl,
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

  async updateReviewImg(
    id: number,
    data: UpdateReviewImgRequest,
  ): Promise<ReviewImage> {
    const image = await this.findOne(id);

    // Nếu có avatarFile thì upload lên S3
    let avatarUrl = data.img_url ?? 'https://example.com/avatar.png'; // default
    if (data.avatarFile) {
      avatarUrl = await this.uploadToS3(data.avatarFile); // bạn cần viết hàm này
    }

    data.img_url = avatarUrl; // cập nhật lại avatarUrl

    await this.reviewImgRepository.update(id, {
      ...image,
      ...data,
    });

    return this.findOne(id);
  }

  async uploadToS3(file: any): Promise<string> {
    const bucket = process.env.AWS_BUCKET_NAME;
    const fileName = `avatars/${uuidv4()}_${file.originalname}`;
    const buffer = Buffer.from(file.buffer);

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: fileName,
      Body: buffer,
      ContentType: file.mimetype,
    });

    await this.s3.send(command);

    return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  }
}
