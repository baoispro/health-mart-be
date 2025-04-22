import { DeleteResult } from 'typeorm';
import { CreatePrecautionRequest } from '../dto/requests/create-precaution-request.dto';
import { UpdatePrecautionRequest } from '../dto/requests/update-precaution-request.dto';
import { Precaution } from '../entities/precaution.entity';

export interface PrecautionService {
  create(createRequest: CreatePrecautionRequest): Promise<Precaution>;
  findAll(): Promise<Precaution[]>;
  findByProduct(productId: number): Promise<Precaution[]>;
  findOne(id: number): Promise<Precaution>;
  update(
    id: number,
    updateRequest: UpdatePrecautionRequest,
  ): Promise<Precaution>;
  remove(id: number): Promise<DeleteResult>;
}
