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

@Injectable()
export class ProductsService implements ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

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

    const newProduct = this.productRepository.create({
      ...productData,
      category,
    });

    console.log('New Product to save:', newProduct); // THÊM DÒNG NÀY

    return await this.productRepository.save(newProduct);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['category'] });
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
        'pharmacyStock',
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
    product.pharmacyStock = product.pharmacyStock ?? [];
    return product;
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
    const { categoryId, ...rest } = updateProductRequest;
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
}
