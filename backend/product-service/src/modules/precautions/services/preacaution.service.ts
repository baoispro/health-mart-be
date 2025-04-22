import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Precaution } from '../entities/precaution.entity';
import { CreatePrecautionRequest } from '../dto/requests/create-precaution-request.dto';
import { UpdatePrecautionRequest } from '../dto/requests/update-precaution-request.dto';
import { Product } from '../../products/entities/product.entity';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PrecautionService {
  constructor(
    @InjectRepository(Precaution)
    private precautionRepository: Repository<Precaution>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createRequest: CreatePrecautionRequest): Promise<Precaution> {
    const product = await this.productRepository.findOne({
      where: { product_id: createRequest.product_id },
    });
    if (!product) {
      throw new RpcException(
        new NotFoundException(
          `Product ${createRequest.product_id} không tồn tại!`,
        ),
      );
    }
    const newPrecaution = this.precautionRepository.create({
      ...createRequest,
      product,
    });
    return await this.precautionRepository.save(newPrecaution);
  }

  async findAll(): Promise<Precaution[]> {
    return await this.precautionRepository.find({ relations: ['product'] });
  }

  async findByProduct(productId: number): Promise<Precaution[]> {
    return await this.precautionRepository.find({
      where: { product: { product_id: productId } },
      relations: ['product'],
    });
  }

  async findOne(id: number): Promise<Precaution> {
    const precaution = await this.precautionRepository.findOne({
      where: { precaution_id: id },
      relations: ['product'],
    });
    if (!precaution) {
      throw new RpcException(
        new NotFoundException(`Precaution ${id} không tồn tại!`),
      );
    }
    return precaution;
  }

  async update(
    id: number,
    updateRequest: UpdatePrecautionRequest,
  ): Promise<Precaution> {
    const precaution = await this.findOne(id);
    Object.assign(precaution, updateRequest);
    return await this.precautionRepository.save(precaution);
  }

  async remove(id: number): Promise<DeleteResult> {
    const result = await this.precautionRepository.delete({
      precaution_id: id,
    });
    if (result.affected === 0) {
      throw new RpcException(
        new NotFoundException(`Không tìm thấy Precaution với id ${id}`),
      );
    }
    return result;
  }
}
