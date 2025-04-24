// side-effect.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SideEffectService as ISideEffectService } from '../interfaces/side_effect.service.interface';
import { CreateSideEffectRequest } from '../dto/requests/create-sideEffect-request.dto';
import { UpdateSideEffectRequest } from '../dto/requests/update-sideEffect-request.dto';
import { RpcException } from '@nestjs/microservices';
import { SideEffect } from '../entities/side_effect.entity';
import { Product } from '../../products/entities/product.entity';

@Injectable()
export class SideEffectService implements ISideEffectService {
  constructor(
    @InjectRepository(SideEffect)
    private sideEffectRepository: Repository<SideEffect>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createRequest: CreateSideEffectRequest): Promise<SideEffect> {
    const product = await this.productRepository.findOne({
      where: { product_id: createRequest.product_id },
    });

    if (!product) {
      throw new RpcException(
        new NotFoundException(`Product ${createRequest.product_id} not found`),
      );
    }

    const newEffect = this.sideEffectRepository.create({
      description: createRequest.description,
      product,
    });

    return await this.sideEffectRepository.save(newEffect);
  }

  async findAll(): Promise<SideEffect[]> {
    return this.sideEffectRepository.find({ relations: ['product'] });
  }

  async findByProduct(productId: number): Promise<SideEffect[]> {
    const effects = await this.sideEffectRepository.find({
      where: { product: { product_id: productId } },
      relations: ['product'],
    });

    if (!effects || effects.length === 0) {
      throw new RpcException(
        new NotFoundException(
          `Không tìm thấy tác dụng phụ nào cho sản phẩm có ID ${productId}`,
        ),
      );
    }

    return effects;
  }

  async update(
    id: number,
    updateRequest: UpdateSideEffectRequest,
  ): Promise<SideEffect> {
    const effect = await this.sideEffectRepository.findOne({
      where: { side_effect_id: id },
      relations: ['product'],
    });

    if (!effect) {
      throw new RpcException(
        new NotFoundException(`Tác dụng phụ của thuốc Id ${id} không tìm thấy`),
      );
    }

    Object.assign(effect, updateRequest);
    return this.sideEffectRepository.save(effect);
  }

  async remove(id: number): Promise<void> {
    const result = await this.sideEffectRepository.delete(id);
    if (result.affected === 0) {
      throw new RpcException(
        new NotFoundException(`Side effect with ID ${id} not found`),
      );
    }
  }
}
