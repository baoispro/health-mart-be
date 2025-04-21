import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { StoragesServiceInterface } from '../interfaces/storages.service.interface';
import { RpcException } from '@nestjs/microservices';
import { Product } from '../entities/product.entity';
import { Storage } from '../entities/storage.entity';
import { CreateStorageRequest } from '../dto/requests/create-storages-request.dto';
import { UpdateStorageRequest } from '../dto/requests/update-storages-request.dto';

@Injectable()
export class StoragesService implements StoragesServiceInterface {
  constructor(
    @InjectRepository(Storage)
    private storageRepository: Repository<Storage>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createStorageRequest: CreateStorageRequest): Promise<Storage> {
    const { product_id, ...storageData } = createStorageRequest;

    const product = await this.productRepository.findOne({
      where: { product_id },
    });

    if (!product) {
      throw new RpcException(
        new NotFoundException(`Product ${product_id} không tồn tại!`),
      );
    }

    const newStorage = this.storageRepository.create({
      ...storageData,
      product,
    });

    console.log('New Product to save:', newStorage); // THÊM DÒNG NÀY

    return await this.storageRepository.save(newStorage);
  }

  async findAll(): Promise<Storage[]> {
    return await this.storageRepository.find({ relations: ['product'] });
  }

  async findOne(id: number): Promise<Storage> {
    const usage = await this.storageRepository.findOne({
      where: { storage_id: id },
      relations: ['product'],
    });
    if (!usage) {
      throw new RpcException(
        new NotFoundException(`Product ${id} không tìm thấy`),
      );
    }
    return usage;
  }

  async findStorageByProductId(productId: number): Promise<Storage[]> {
    const storage = await this.storageRepository.find({
      where: { product: { product_id: productId } },
      relations: ['product'],
    });
    if (!storage) {
      throw new RpcException(
        new NotFoundException(`Product ${productId} không tìm thấy`),
      );
    }
    return storage;
  }

  async update(
    id: number,
    updateStorageRequest: UpdateStorageRequest,
  ): Promise<Storage> {
    const { product_id, ...storageData } = updateStorageRequest;

    const storage = await this.storageRepository.findOne({
      where: { storage_id: id },
      relations: ['product'],
    });
    if (!storage) {
      throw new RpcException(
        new NotFoundException(`Storage ${id} không tồn tại!`),
      );
    }
    if (storage.product.product_id !== product_id) {
      const product = await this.productRepository.findOne({
        where: { product_id },
      });
      if (!product) {
        throw new RpcException(
          new NotFoundException(`Product ${product_id} không tồn tại!`),
        );
      }
      storage.product = product;
    }
    return await this.storageRepository.save({
      ...storage,
      ...storageData,
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.storageRepository.delete({ storage_id: id });
  }
}
