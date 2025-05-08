import { DeleteResult } from 'typeorm';
import { PharmacyProduct } from '../entities/pharmacy_product.entity';
import { CreatePharmacyProductRequest } from '../dto/requests/create-pharmacyproduct-request.dto';
import { UpdatePharmacyProductRequest } from '../dto/requests/update-pharmacyproduct-request.dto';

export interface IPharmacyProductService {
  create(createRequest: CreatePharmacyProductRequest): Promise<PharmacyProduct>;
  findAll(): Promise<PharmacyProduct[]>;
  findByPharmacy(pharmacyId: number): Promise<PharmacyProduct[]>;
  findByProduct(productId: number): Promise<PharmacyProduct[]>;
  findOne(pharmacyId: number, productId: number): Promise<PharmacyProduct>;
  update(
    pharmacyId: number,
    productId: number,
    updateRequest: UpdatePharmacyProductRequest,
  ): Promise<PharmacyProduct>;
  remove(pharmacyId: number, productId: number): Promise<DeleteResult>;
}
