import { DeleteResult } from 'typeorm';
import { Policy } from '../entities/policies.entity';
import { CreatePolicyRequest } from '../dto/requests/create-policy-request.dto';
import { UpdatePolicyRequest } from '../dto/requests/update-policy-request.dto';

export interface IPolicyService {
  create(createPolicyRequest: CreatePolicyRequest): Promise<Policy>;
  findAll(): Promise<Policy[]>;
  findOne(id: number): Promise<Policy>;
  update(id: number, updatePolicyRequest: UpdatePolicyRequest): Promise<Policy>;
  remove(id: number): Promise<DeleteResult>;
}
