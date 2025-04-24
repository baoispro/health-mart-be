import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { DosagesServiceInterface } from '../interfaces/dosages.service.interface';
import { RpcException } from '@nestjs/microservices';
import { CreateDosageRequest } from '../dto/requests/create-dosages-request.dto';
import { Dosage } from '../entities/dosage.entity';
import { UpdateDosagesRequest } from '../dto/requests/update-dosages-request.dto';
import { Product } from 'src/modules/products/entities/product.entity';

@Injectable()
export class DosagesService implements DosagesServiceInterface {
  constructor(
    @InjectRepository(Dosage)
    private dosageRepository: Repository<Dosage>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createDosageRequest: CreateDosageRequest): Promise<Dosage> {
    const { product_id, ...dosageData } = createDosageRequest;

    const product = await this.productRepository.findOne({
      where: { product_id },
    });

    if (!product) {
      throw new RpcException(
        new NotFoundException(`Product ${product_id} không tồn tại!`),
      );
    }

    const newDosage = this.dosageRepository.create({
      ...dosageData,
      product,
    });

    console.log('New Product to save:', newDosage); // THÊM DÒNG NÀY

    return await this.dosageRepository.save(newDosage);
  }

  async findAll(): Promise<Dosage[]> {
    return await this.dosageRepository.find({ relations: ['product'] });
  }

  async findOne(id: number): Promise<Dosage> {
    const usage = await this.dosageRepository.findOne({
      where: { dosage_id: id },
      relations: ['product'],
    });
    if (!usage) {
      throw new RpcException(
        new NotFoundException(`Product ${id} không tìm thấy`),
      );
    }
    return usage;
  }

  async findDosageByProductId(productId: number): Promise<Dosage[]> {
    const dosage = await this.dosageRepository.find({
      where: { product: { product_id: productId } },
      relations: ['product'],
    });
    if (!dosage) {
      throw new RpcException(
        new NotFoundException(`Product ${productId} không tìm thấy`),
      );
    }
    return dosage;
  }

  async update(
    id: number,
    updateDosageRequest: UpdateDosagesRequest,
  ): Promise<Dosage> {
    const { product_id, ...dosageData } = updateDosageRequest;

    const dosage = await this.dosageRepository.findOne({
      where: { dosage_id: id },
      relations: ['product'],
    });
    if (!dosage) {
      throw new RpcException(
        new NotFoundException(`dosage ${id} không tồn tại!`),
      );
    }
    if (dosage.product.product_id !== product_id) {
      const product = await this.productRepository.findOne({
        where: { product_id },
      });
      if (!product) {
        throw new RpcException(
          new NotFoundException(`Product ${product_id} không tồn tại!`),
        );
      }
      dosage.product = product;
    }
    return await this.dosageRepository.save({
      ...dosage,
      ...dosageData,
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.dosageRepository.delete({ dosage_id: id });
  }
}
