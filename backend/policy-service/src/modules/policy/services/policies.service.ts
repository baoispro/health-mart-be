import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Not, Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { IPolicyService } from '../interfaces/policies.service.interface';
import { Policy } from '../entities/policies.entity';
import { CreatePolicyRequest } from '../dto/requests/create-policy-request.dto';
import { UpdatePolicyRequest } from '../dto/requests/update-policy-request.dto';

@Injectable()
export class PoliciesService implements IPolicyService {
  constructor(
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>,
  ) {}

  async create(createPolicyRequest: CreatePolicyRequest): Promise<Policy> {
    const { slug } = createPolicyRequest;

    const existingPolicy = await this.policyRepository.findOne({
      where: [{ slug }],
    });

    if (existingPolicy) {
      throw new RpcException(new ConflictException('Slug đã tồn tại!'));
    }
    const newPolicy = this.policyRepository.create(createPolicyRequest);
    return await this.policyRepository.save(newPolicy);
  }

  async findAll(): Promise<Policy[]> {
    return await this.policyRepository.find();
  }

  async findOne(id: number): Promise<Policy> {
    const policy = await this.policyRepository.findOne({ where: { id } });
    if (!policy) {
      throw new RpcException(
        new NotFoundException(`Policy ${id} không tìm thấy`),
      );
    }
    return policy;
  }

  async update(
    id: number,
    updatePolicyRequest: UpdatePolicyRequest,
  ): Promise<Policy> {
    const policy = await this.findOne(id);
    const { slug } = updatePolicyRequest;

    if (slug) {
      const existingPolicy = await this.policyRepository.findOne({
        where: [slug ? { slug, id: Not(id) } : null].filter(Boolean),
      });

      if (existingPolicy) {
        throw new RpcException(new ConflictException('Slug đã tồn tại!'));
      }
    }
    Object.assign(policy, updatePolicyRequest);
    return await this.policyRepository.save(policy);
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.policyRepository.delete(id);
  }
}
