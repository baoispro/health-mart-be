import { DeleteResult } from 'typeorm';
import { CreateAddressDto } from '../dto/requests/create-address-request.dto';
import { Address } from '../entities/address.entity';
import { UpdateAddressDto } from '../dto/requests/update-address-request.dto';

export interface IAddressService {
  createAddress(createAddressDto: CreateAddressDto): Promise<Address>;
  findOne(id: number): Promise<Address>;
  update(id: number, updateUserRequest: UpdateAddressDto): Promise<Address>;
  remove(id: number): Promise<DeleteResult>;
}
