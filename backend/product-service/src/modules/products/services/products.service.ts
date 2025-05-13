import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ProductService } from '../interfaces/products.service.interface';
import { CreateProductRequest } from '../dto/requests/create-product-request.dto';
import { UpdateProductRequest } from '../dto/requests/update-product-request.dto';
import { RpcException } from '@nestjs/microservices';
import { Category } from '../../categories/entities/category.entity';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService implements ProductService {
  private s3: S3Client;
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
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

  async create(createProductRequest: CreateProductRequest): Promise<Product> {
    const { category_id, ...productData } = createProductRequest;

    const category = await this.categoryRepository.findOne({
      where: { category_id },
    });

    if (!category) {
      throw new RpcException(
        new NotFoundException(`Category ${category_id} không tồn tại!`),
      );
    }

    const existingProduct = await this.productRepository.findOne({
      where: [{ slug: productData.slug }],
    });
    if (existingProduct) {
      throw new RpcException(
        new ConflictException('Slug sản phẩm đã tồn tại!'),
      );
    }

    // Nếu có avatarFile thì upload lên S3
    let avatarUrl = productData.image_url ?? 'https://example.com/avatar.png'; // default
    if (productData.avatarFile) {
      avatarUrl = await this.uploadToS3(productData.avatarFile); // bạn cần viết hàm này
    }

    productData.image_url = avatarUrl;

    const newProduct = this.productRepository.create({
      ...productData,
      category,
    });
    return await this.productRepository.save(newProduct);
  }

  async findAll(): Promise<any[]> {
    const data = await this.productRepository.find({ relations: ['category'] });

    const grouped: Record<string, any> = {};

    data.forEach((item) => {
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

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { product_id: id },
      relations: [
        'category',
        'usages',
        'ingredients',
        'dosages',
        'precautions',
        'sideEffects',
        'storages',
      ],
    });
    if (!product) {
      throw new RpcException(
        new NotFoundException(`Product ${id} không tìm thấy`),
      );
    }
    product.ingredients = product.ingredients ?? [];
    product.usages = product.usages ?? [];
    product.dosages = product.dosages ?? [];
    product.sideEffects = product.sideEffects ?? [];
    product.precautions = product.precautions ?? [];
    product.storages = product.storages ?? [];
    product.pharmacyProduct = product.pharmacyProduct ?? [];
    return product;
  }

  async findBySlug(slug: string): Promise<any> {
    const data = await this.productRepository.find({
      relations: ['category'],
      where: { slug },
    });

    if (!data || data.length === 0) {
      throw new NotFoundException('Product not found');
    }

    // Lấy tên gốc từ sản phẩm đầu tiên
    const baseName = data[0].name.replace(/-(Hộp|Vỉ|Viên)$/i, '').trim();

    // Tạo object kết quả từ sản phẩm đầu tiên
    const result = {
      ...data[0],
      name: baseName,
      variants: [],
    };

    // Xoá thuộc tính riêng của variant vì đã gom lại
    delete result.unit;
    delete result.price;

    // Gom các biến thể lại
    for (const item of data) {
      result.variants.push({
        unit: item.unit,
        price: item.price,
      });
    }

    return result;
  }

  async update(
    id: number,
    updateProductRequest: UpdateProductRequest,
  ): Promise<Product> {
    const product = await this.findOne(id);

    // Nếu có update category
    if (updateProductRequest.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { category_id: updateProductRequest.categoryId },
      });
      if (!category) {
        throw new RpcException('Category không tồn tại!');
      }
      product.category = category;
    }

    // Loại bỏ categoryId tránh ghi đè
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { categoryId, avatarFile, ...rest } = updateProductRequest;

    // Nếu có avatarFile thì upload lên S3
    let avatarUrl = rest.image_url ?? 'https://example.com/avatar.png'; // default
    if (avatarFile) {
      avatarUrl = await this.uploadToS3(avatarFile); // bạn cần viết hàm này
    }

    rest.image_url = avatarUrl;

    Object.assign(product, rest);

    await this.productRepository.save(product);

    // Tìm lại product kèm quan hệ category
    const updatedProduct = await this.productRepository.findOne({
      where: { product_id: id },
      relations: ['category'],
    });

    return updatedProduct;
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.productRepository.delete({ product_id: id });
  }

  async checkProductExist(id: number): Promise<Product | null> {
    const product = await this.productRepository.findOne({
      where: { product_id: id },
    });
    if (!product) {
      return null;
    }
    return product;
  }

  //Lấy giá sản phẩm
  async getProductPrice(productId: number): Promise<number> {
    const product = await this.productRepository.findOne({
      where: { product_id: productId },
    });
    if (!product) {
      throw new RpcException(
        new NotFoundException(`Sản phẩm với ID ${productId} không tồn tại!`),
      );
    }
    return product.price;
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
