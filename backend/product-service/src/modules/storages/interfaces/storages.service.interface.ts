import { DeleteResult } from 'typeorm';
import { UpdateStorageRequest } from '../dto/requests/update-storages-request.dto';
import { Storage } from '../entities/storage.entity';
import { CreateStorageRequest } from '../dto/requests/create-storages-request.dto';

export interface StoragesServiceInterface {
  create(createStorageRequest: CreateStorageRequest): Promise<Storage>;
  findAll(): Promise<Storage[]>;
  findOne(id: number): Promise<Storage>;
  update(
    id: number,
    updateStorageRequest: UpdateStorageRequest,
  ): Promise<Storage>;
  remove(id: number): Promise<DeleteResult>;
}
