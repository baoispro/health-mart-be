import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { PharmacyStockService as IPharmacyStockService } from '../interfaces/pharmacy_stock.service.interface';
import { CreatePharmacyStockRequest } from '../dto/requests/create-pharmacystock-request.dto';
import { UpdatePharmacyStockRequest } from '../dto/requests/update-pharmacystock-request.dto';
import { RpcException } from '@nestjs/microservices';
import { PharmacyStock } from '../entities/pharmacy_stock.entity';
import { Product } from '../../products/entities/product.entity';

@Injectable()
export class PharmacyStockService implements IPharmacyStockService {
  constructor(
    @InjectRepository(PharmacyStock)
    private pharmacyStockRepository: Repository<PharmacyStock>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createRequest: CreatePharmacyStockRequest): Promise<PharmacyStock> {
    const product = await this.productRepository.findOne({
      where: { product_id: createRequest.product_id }
    });
    if (!product) {
      throw new RpcException(
        new NotFoundException(`Product ${createRequest.product_id} không tồn tại!`),
      );
    }
    const newStock = this.pharmacyStockRepository.create({
      ...createRequest,
      product
    });
    return await this.pharmacyStockRepository.save(newStock);
  }

  async findAll(): Promise<PharmacyStock[]> {
    return await this.pharmacyStockRepository.find({ relations: ['product'] });
  }


  async findOne(pharmacyId: number, productId: number): Promise<PharmacyStock> {
    const stock = await this.pharmacyStockRepository.findOne({
      where: { 
        pharmacy_id: pharmacyId,
        product_id: productId
      },
      relations: ['product'],
    });

    if (!stock) {
      throw new RpcException(
        new NotFoundException(`Không tìm thấy tồn kho cho nhà thuốc ${pharmacyId} và sản phẩm ${productId}`),
      );
    }

    return stock;
  }


  async findByPharmacy(pharmacyId: number): Promise<PharmacyStock[]> {
    const stocks = await this.pharmacyStockRepository.find({
      where: { pharmacy_id: pharmacyId },
      relations: ['product'],
    });
  
    if (stocks.length === 0) {
      throw new RpcException(
        new NotFoundException(`Không tìm thấy tồn kho cho nhà thuốc ${pharmacyId}`),
      );
    }
  
    return stocks;
  }
  
  async findByProduct(productId: number): Promise<PharmacyStock[]> {
    const stocks = await this.pharmacyStockRepository.find({
      where: { product_id: productId },
      relations: ['product'],
    });
  
    if (stocks.length === 0) {
      throw new RpcException(
        new NotFoundException(`Không tìm thấy tồn kho cho sản phẩm ${productId}`),
      );
    }
  
    return stocks;
  }
  
  async update(
    pharmacyId: number,
    productId: number, 
    updateRequest: UpdatePharmacyStockRequest,
  ): Promise<PharmacyStock> {
    const stock = await this.pharmacyStockRepository.findOne({
      where: {
        pharmacy_id: pharmacyId,
        product_id: productId,
      },
      relations: ['product'],
    });
  
    if (!stock) {
      throw new RpcException(
        new NotFoundException(`Không tìm thấy tồn kho cho nhà thuốc ${pharmacyId} và sản phẩm ${productId}`),
      );
    }
  
    Object.assign(stock, updateRequest);
    await this.pharmacyStockRepository.save(stock);
    return stock;
  }
  
  async remove(pharmacyId: number, productId: number): Promise<DeleteResult> {
    const result = await this.pharmacyStockRepository.delete({
      pharmacy_id: pharmacyId,
      product_id: productId,
    });
    if (result.affected === 0) {
      throw new RpcException(
        new NotFoundException(`Không tìm thấy tồn kho với nhà thuốc ${pharmacyId} và sản phẩm ${productId}`),
      );
    }
    return result;
  }

  async checkPharmacyExist(id: number): Promise<PharmacyStock | null> {
    const user = await this.pharmacyStockRepository.findOne({ where: { pharmacy_id : id } });
    if (!user) {
      return null;
    }
    return user;
  }
  
}