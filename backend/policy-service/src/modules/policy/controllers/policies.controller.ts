import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { PoliciesService } from '../services/policies.service';
import { CreatePolicyRequest } from '../dto/requests/create-policy-request.dto';
import { UpdatePolicyRequest } from '../dto/requests/update-policy-request.dto';

@Controller('policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @MessagePattern('get_all_policies')
  getAllUsers() {
    return this.policiesService.findAll();
  }

  @MessagePattern('get_policy_by_id')
  async getUserById(@Payload() id: number) {
    return this.policiesService.findOne(id);
  }

  @MessagePattern('create_policy')
  async createUser(@Payload() createPolicyRequest: CreatePolicyRequest) {
    return this.policiesService.create(createPolicyRequest);
  }

  @MessagePattern('update_policy')
  async updateDosage(
    @Payload()
    payload: {
      id: number;
      updatePolicyRequest: UpdatePolicyRequest;
    },
  ) {
    const { id, updatePolicyRequest } = payload;
    return this.policiesService.update(id, updatePolicyRequest);
  }

  @MessagePattern('delete_policy')
  async deleteUser(@Payload() id: number) {
    return this.policiesService.remove(id);
  }
}
