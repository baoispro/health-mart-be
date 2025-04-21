import { DeleteResult } from 'typeorm';
import { CreatePharmacyStockRequest } from '../dto/requests/create-pharmacystock-request.dto';
import { UpdatePharmacyStockRequest } from '../dto/requests/update-pharmacystock-request.dto';
import { PharmacyStock } from '../entities/pharmacy_stock.entity';

export interface PharmacyStockService {
  create(createRequest: CreatePharmacyStockRequest): Promise<PharmacyStock>;
  findAll(): Promise<PharmacyStock[]>;
  findByPharmacy(pharmacyId: number): Promise<PharmacyStock[]>;   
  findByProduct(productId: number): Promise<PharmacyStock[]>;     
  findOne(pharmacyId: number, productId: number): Promise<PharmacyStock>; 
  update(
    pharmacyId: number, 
    productId: number, 
    updateRequest: UpdatePharmacyStockRequest
  ): Promise<PharmacyStock>;
  remove(pharmacyId: number, productId: number): Promise<DeleteResult>;
}
