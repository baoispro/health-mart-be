import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UsagesServiceInterface } from '../interfaces/usages.service.interface';
import { RpcException } from '@nestjs/microservices';
import { Usage } from '../entities/usage.entity';
import { CreateUsageRequest } from '../dto/requests/create-usages-request.dto';
import { Product } from '../entities/product.entity';
import { UpdateUsageRequest } from '../dto/requests/update-usages-request.dto';

@Injectable()
export class UsagesService implements UsagesServiceInterface {
  constructor(
    @InjectRepository(Usage)
    private usageRepository: Repository<Usage>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createUsageRequest: CreateUsageRequest): Promise<Usage> {
    const { product_id, ...usageData } = createUsageRequest;

    const product = await this.productRepository.findOne({
      where: { product_id },
    });

    if (!product) {
      throw new RpcException(
        new NotFoundException(`Product ${product_id} không tồn tại!`),
      );
    }

    const newUsage = this.usageRepository.create({
      ...usageData,
      product,
    });

    console.log('New Product to save:', newUsage); // THÊM DÒNG NÀY

    return await this.usageRepository.save(newUsage);
  }

  async findAll(): Promise<Usage[]> {
    return await this.usageRepository.find({ relations: ['product'] });
  }

  async findOne(id: number): Promise<Usage> {
    const usage = await this.usageRepository.findOne({
      where: { usage_id: id },
      relations: ['product'],
    });
    if (!usage) {
      throw new RpcException(
        new NotFoundException(`Product ${id} không tìm thấy`),
      );
    }
    return usage;
  }

  async findUsageByProductId(productId: number): Promise<Usage[]> {
    const usages = await this.usageRepository.find({
      where: { product: { product_id: productId } },
      relations: ['product'],
    });
    if (!usages) {
      throw new RpcException(
        new NotFoundException(`Product ${productId} không tìm thấy`),
      );
    }
    return usages;
  }

  async update(
    id: number,
    updateUsageRequest: UpdateUsageRequest,
  ): Promise<Usage> {
    const { product_id, ...usageData } = updateUsageRequest;

    const usage = await this.usageRepository.findOne({
      where: { usage_id: id },
      relations: ['product'],
    });
    if (!usage) {
      throw new RpcException(
        new NotFoundException(`Usage ${id} không tồn tại!`),
      );
    }
    if (usage.product.product_id !== product_id) {
      const product = await this.productRepository.findOne({
        where: { product_id },
      });
      if (!product) {
        throw new RpcException(
          new NotFoundException(`Product ${product_id} không tồn tại!`),
        );
      }
      usage.product = product;

      console.log('Product to save:', usage.product); // THÊM DÒNG NÀY

      console.log('Product ID:', product.product_id); // THÊM DÒNG NÀY

      console.log('Usage ID:', usage.usage_id); // THÊM DÒNG NÀY

      console.log('Usage to save:', usage); // THÊM DÒNG NÀY
    }
    return await this.usageRepository.save({
      ...usage,
      ...usageData,
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.usageRepository.delete({ usage_id: id });
  }
}
