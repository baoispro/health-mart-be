import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { IPharmacyProductService } from '../interfaces/pharmacy_product.service.interface';
import { RpcException } from '@nestjs/microservices';
import { Product } from '../../products/entities/product.entity';
import { PharmacyProduct } from '../entities/pharmacy_product.entity';
import { CreatePharmacyProductRequest } from '../dto/requests/create-pharmacyproduct-request.dto';
import { UpdatePharmacyProductRequest } from '../dto/requests/update-pharmacyproduct-request.dto';

@Injectable()
export class PharmacyProductService implements IPharmacyProductService {
  constructor(
    @InjectRepository(PharmacyProduct)
    private pharmacyProductRepository: Repository<PharmacyProduct>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(
    createRequest: CreatePharmacyProductRequest,
  ): Promise<PharmacyProduct> {
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
    const newStock = this.pharmacyProductRepository.create({
      ...createRequest,
      product,
    });
    return await this.pharmacyProductRepository.save(newStock);
  }

  async findAll(): Promise<PharmacyProduct[]> {
    return await this.pharmacyProductRepository.find({
      relations: ['product'],
    });
  }

  async findOne(
    pharmacyId: number,
    productId: number,
  ): Promise<PharmacyProduct> {
    const stock = await this.pharmacyProductRepository.findOne({
      where: {
        pharmacy_id: pharmacyId,
        product_id: productId,
      },
      relations: ['product'],
    });

    if (!stock) {
      throw new RpcException(
        new NotFoundException(
          `Không tìm thấy tồn kho cho nhà thuốc ${pharmacyId} và sản phẩm ${productId}`,
        ),
      );
    }

    return stock;
  }

  async findByPharmacy(pharmacyId: number): Promise<PharmacyProduct[]> {
    const stocks = await this.pharmacyProductRepository.find({
      where: { pharmacy_id: pharmacyId },
      relations: ['product'],
    });

    if (stocks.length === 0) {
      throw new RpcException(
        new NotFoundException(
          `Không tìm thấy tồn kho cho nhà thuốc ${pharmacyId}`,
        ),
      );
    }

    return stocks;
  }

  async findByProduct(productId: number): Promise<PharmacyProduct[]> {
    const stocks = await this.pharmacyProductRepository.find({
      where: { product_id: productId },
      relations: ['product'],
    });

    if (stocks.length === 0) {
      throw new RpcException(
        new NotFoundException(
          `Không tìm thấy tồn kho cho sản phẩm ${productId}`,
        ),
      );
    }

    return stocks;
  }

  async update(
    pharmacyId: number,
    productId: number,
    updateRequest: UpdatePharmacyProductRequest,
  ): Promise<PharmacyProduct> {
    const stock = await this.pharmacyProductRepository.findOne({
      where: {
        pharmacy_id: pharmacyId,
        product_id: productId,
      },
      relations: ['product'],
    });

    if (!stock) {
      throw new RpcException(
        new NotFoundException(
          `Không tìm thấy tồn kho cho nhà thuốc ${pharmacyId} và sản phẩm ${productId}`,
        ),
      );
    }

    Object.assign(stock, updateRequest);
    await this.pharmacyProductRepository.save(stock);
    return stock;
  }

  async remove(pharmacyId: number, productId: number): Promise<DeleteResult> {
    const result = await this.pharmacyProductRepository.delete({
      pharmacy_id: pharmacyId,
      product_id: productId,
    });
    if (result.affected === 0) {
      throw new RpcException(
        new NotFoundException(
          `Không tìm thấy tồn kho với nhà thuốc ${pharmacyId} và sản phẩm ${productId}`,
        ),
      );
    }
    return result;
  }

  async checkPharmacyExist(id: number): Promise<PharmacyProduct | null> {
    const pharmacy = await this.pharmacyProductRepository.findOne({
      where: { pharmacy_id: id },
    });
    if (!pharmacy) {
      return null;
    }
    return pharmacy;
  }
}
