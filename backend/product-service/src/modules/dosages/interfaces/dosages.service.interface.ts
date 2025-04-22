import { DeleteResult } from 'typeorm';
import { CreateDosageRequest } from '../dto/requests/create-dosages-request.dto';
import { Dosage } from '../entities/dosage.entity';
import { UpdateDosagesRequest } from '../dto/requests/update-dosages-request.dto';

export interface DosagesServiceInterface {
  create(createDosageRequest: CreateDosageRequest): Promise<Dosage>;
  findAll(): Promise<Dosage[]>;
  findOne(id: number): Promise<Dosage>;
  update(
    id: number,
    updateDosageRequest: UpdateDosagesRequest,
  ): Promise<Dosage>;
  remove(id: number): Promise<DeleteResult>;
}
