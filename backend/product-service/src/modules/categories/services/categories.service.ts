import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CategoryService } from '../interfaces/categories.service.interface';
import { CreateCategoryRequest } from '../dto/requests/create-category-request.dto';
import { UpdateCategoryRequest } from '../dto/requests/update-category-request.dto';
import { RpcException } from '@nestjs/microservices';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CategoriesService implements CategoryService {
  private s3: S3Client;
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  async create(
    createCategoryRequest: CreateCategoryRequest,
  ): Promise<Category> {
    const { parent_id, slug, ...data } = createCategoryRequest;

    // ✅ Kiểm tra slug đã tồn tại chưa
    const existing = await this.categoryRepository.findOne({ where: { slug } });
    if (existing) {
      throw new RpcException(
        new NotFoundException(`Slug '${slug}' đã tồn tại`),
      );
    }

    let parent: Category = null;
    if (parent_id) {
      parent = await this.categoryRepository.findOne({
        where: { category_id: parent_id },
      });
      if (!parent) {
        throw new RpcException(
          new NotFoundException(`Parent category ${parent_id} không tồn tại`),
        );
      }
    }

    let avatarUrl = data.image ?? 'https://example.com/avatar.png'; // default
    if (data.avatarFile) {
      avatarUrl = await this.uploadToS3(data.avatarFile); // bạn cần viết hàm này
    }

    data.image = avatarUrl;

    const newCategory = this.categoryRepository.create({
      ...data,
      slug,
      parent,
    });
    return await this.categoryRepository.save(newCategory);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({
      relations: ['parent', 'children'],
    });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { category_id: id },
      relations: ['parent', 'children'],
    });
    if (!category) {
      throw new RpcException(
        new NotFoundException(`Category ${id} không tìm thấy`),
      );
    }
    return category;
  }

  async update(
    id: number,
    updateCategoryRequest: UpdateCategoryRequest,
  ): Promise<Category> {
    const category = await this.findOne(id);

    const { parent_id, slug, ...rest } = updateCategoryRequest;

    // ✅ Nếu có slug mới và khác slug hiện tại → kiểm tra trùng
    if (slug && slug !== category.slug) {
      const existing = await this.categoryRepository.findOne({
        where: { slug },
      });
      if (existing && existing.category_id !== id) {
        throw new RpcException(
          new NotFoundException(`Slug '${slug}' đã tồn tại`),
        );
      }
      category.slug = slug; // gán slug mới nếu hợp lệ
    }

    if (parent_id) {
      const parent = await this.categoryRepository.findOne({
        where: { category_id: parent_id },
      });
      if (!parent) {
        throw new RpcException(
          new NotFoundException(`Parent category không tồn tại`),
        );
      }
      category.parent = parent;
    }

    let avatarUrl = rest.image ?? 'https://example.com/avatar.png'; // default
    if (rest.avatarFile) {
      avatarUrl = await this.uploadToS3(rest.avatarFile); // bạn cần viết hàm này
    }

    rest.image = avatarUrl;

    Object.assign(category, rest);

    await this.categoryRepository.save(category);

    return this.findOne(id); // return lại với các quan hệ
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.categoryRepository.delete({ category_id: id });
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

  async findRootCategories(): Promise<Category[]> {
    return this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.children', 'children')
      .where('category.parent IS NULL')
      .getMany();
  }
}
