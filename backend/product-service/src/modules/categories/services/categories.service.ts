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

    let avatarUrl =
      data.image ??
      'https://bucket-ktpm.s3.ap-southeast-1.amazonaws.com/avatars/4c66412e-6894-4bfd-b717-3018f79faf13_avatar-default.svg'; // default
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

  async findOne(category_id: number): Promise<Category> {
    const category = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.parent', 'parent')
      .leftJoinAndSelect('category.children', 'children') // Cấp 1
      .leftJoinAndSelect('children.children', 'subChildren') // Cấp 2
      .leftJoinAndSelect('subChildren.children', 'subSubChildren') // Cấp 3
      .where('category.category_id = :category_id', { category_id })
      .getOne();

    if (!category) {
      throw new RpcException(
        new NotFoundException(
          `Category với id "${category_id}" không tồn tại!`,
        ),
      );
    }

    // Sắp xếp và build lại dạng object như yêu cầu
    const res = this.buildCategoryTreeResponse(category);
    return res;
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

    let avatarUrl =
      rest.image ??
      'https://bucket-ktpm.s3.ap-southeast-1.amazonaws.com/avatars/4c66412e-6894-4bfd-b717-3018f79faf13_avatar-default.svg'; // default
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
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.children', 'children') // Lấy children cấp 1
      .leftJoinAndSelect('children.children', 'subChildren') // Lấy children cấp 2
      .leftJoinAndSelect('subChildren.children', 'subSubChildren') // Lấy children cấp 3
      .where('category.parent IS NULL') // Lọc để chỉ lấy các danh mục cấp 1
      .getMany();

    // Sắp xếp các danh mục cấp 1 theo category_id
    categories.sort((a, b) => a.category_id - b.category_id);

    // Hàm để xử lý đệ quy và sắp xếp danh mục con
    const buildCategoryTree = (categories: Category[]): Category[] => {
      return categories.map((category) => {
        if (category.children && category.children.length > 0) {
          // Sắp xếp children của cấp 1
          category.children.sort((a, b) => a.category_id - b.category_id);
          category.children = buildCategoryTree(category.children); // Đệ quy xử lý children
        }
        return category;
      });
    };

    // Xây dựng cây danh mục đệ quy và trả về
    return buildCategoryTree(categories);
  }

  async getCategoryBySlug(slug: string): Promise<any> {
    const category = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.parent', 'parent')
      .leftJoinAndSelect('category.children', 'children') // Cấp 1
      .leftJoinAndSelect('children.children', 'subChildren') // Cấp 2
      .leftJoinAndSelect('subChildren.children', 'subSubChildren') // Cấp 3
      .where('category.slug = :slug', { slug })
      .getOne();

    if (!category) {
      throw new RpcException(
        new NotFoundException(`Category với slug "${slug}" không tồn tại!`),
      );
    }

    // Sắp xếp và build lại dạng object như yêu cầu
    const res = this.buildCategoryTreeResponse(category);
    return res;
  }

  private buildCategoryTreeResponse(category: Category): any {
    return {
      category_id: category.category_id,
      name: category.name,
      slug: category.slug,
      image: category.image,
      parent: category.parent
        ? {
            category_id: category.parent.category_id,
            name: category.parent.name,
            slug: category.parent.slug,
          }
        : null,
      children: (category.children || [])
        .sort((a, b) => a.category_id - b.category_id)
        .map((child) => this.buildCategoryTreeResponse(child)),
    };
  }

  async findRelatedCategories(id: number): Promise<Category[]> {
    const category = await this.categoryRepository.findOne({
      where: { category_id: id },
      relations: ['parent', 'children'],
    });

    if (!category) {
      throw new RpcException(new NotFoundException('Category not found'));
    }

    const related: Category[] = [];

    // Đệ quy tìm tất cả cha
    const getParents = async (cat: Category) => {
      if (cat.parent) {
        const parent = await this.categoryRepository.findOne({
          where: { category_id: cat.parent.category_id },
          relations: ['parent'],
        });
        if (parent) {
          related.push(parent);
          await getParents(parent);
        }
      }
    };

    // Đệ quy tìm tất cả con
    const getChildren = async (cat: Category) => {
      const children = await this.categoryRepository.find({
        where: { parent: { category_id: cat.category_id } },
        relations: ['children'],
      });
      for (const child of children) {
        related.push(child);
        await getChildren(child);
      }
    };

    await getParents(category);
    await getChildren(category);

    return related;
  }

  async getListLv3(id: number): Promise<Category[]> {
    const category = await this.categoryRepository.findOne({
      where: { category_id: id },
      relations: ['parent', 'children', 'products'],
    });

    if (!category) {
      throw new RpcException(new NotFoundException('Category not found'));
    }

    const related: Category[] = [];

    const getParents = async (cat: Category) => {
      if (cat.parent) {
        const parent = await this.categoryRepository.findOne({
          where: { category_id: cat.parent.category_id },
          relations: ['parent', 'products'],
        });
        if (parent) {
          related.push(parent);
          await getParents(parent);
        }
      }
    };

    const getChildren = async (cat: Category) => {
      const children = await this.categoryRepository.find({
        where: { parent: { category_id: cat.category_id } },
        relations: ['children', 'products'],
      });
      for (const child of children) {
        related.push(child);
        await getChildren(child);
      }
    };

    await getParents(category);

    // Nếu category là cấp 3 (không có con) => xử lý luôn
    if (!category.children || category.children.length === 0) {
      related.push(category);
    } else {
      await getChildren(category);
    }

    // Chỉ giữ lại cấp 3 (leaf nodes - không có children)
    const lv3Categories = related.filter(
      (c) => !c.children || c.children.length === 0,
    );

    const allProducts = lv3Categories.flatMap((c) => c.products || []);

    // Gom nhóm theo base name
    const grouped: Record<string, any> = {};

    allProducts.forEach((item) => {
      const baseName = item.name.replace(/-(Hộp|Vỉ|Viên)$/i, '').trim();

      if (!grouped[baseName]) {
        grouped[baseName] = {
          ...item,
          name: baseName,
          variants: [],
        };
        delete grouped[baseName].unit;
        delete grouped[baseName].price;
      }

      grouped[baseName].variants.push({
        unit: item.unit,
        price: item.price,
      });
    });

    return Object.values(grouped).sort((a, b) => a.product_id - b.product_id);
  }
}
