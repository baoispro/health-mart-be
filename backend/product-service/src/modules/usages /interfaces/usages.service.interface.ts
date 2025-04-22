import { DeleteResult } from 'typeorm';
import { CreateUsageRequest } from '../dto/requests/create-usages-request.dto';
import { UpdateUsageRequest } from '../dto/requests/update-usages-request.dto';
import { Usage } from '../entities/usage.entity';

export interface UsagesServiceInterface {
  create(createUsageRequest: CreateUsageRequest): Promise<Usage>;
  findAll(): Promise<Usage[]>;
  findOne(id: number): Promise<Usage>;
  update(id: number, updateUsageRequest: UpdateUsageRequest): Promise<Usage>;
  remove(id: number): Promise<DeleteResult>;
}
