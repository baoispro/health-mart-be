import { Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { CreatePolicyRequest } from '../dto/request/create-policy-request.dto';
import { instanceToPlain } from 'class-transformer';
import { UpdatePolicyRequest } from '../dto/request/update-policy-request.dto';

@Injectable()
export class PoliciesService {
  private policyClient: ClientProxy;

  constructor(private readonly clientProxyFactory: ClientProxyFactoryService) {
    this.policyClient = this.clientProxyFactory.createClient('policyService');
  }

  private handleError = catchError((error) =>
    throwError(() => new RpcException(error.response || error.message)),
  );

  getAllPolicies() {
    return this.policyClient
      .send('get_all_policies', {})
      .pipe(this.handleError);
  }

  getPolicyById(id: number) {
    return this.policyClient
      .send('get_policy_by_id', id)
      .pipe(this.handleError);
  }

  createPolicy(createPolicyRequest: CreatePolicyRequest) {
    const payload = instanceToPlain(createPolicyRequest);
    return this.policyClient
      .send('create_policy', payload)
      .pipe(this.handleError);
  }

  updatePolicy(id: number, updatePolicyRequest: UpdatePolicyRequest) {
    const payload = instanceToPlain(updatePolicyRequest);
    return this.policyClient
      .send('update_policy', { id, updatePolicyRequest: payload })
      .pipe(this.handleError);
  }

  deletePolicy(id: number) {
    return this.policyClient.send('delete_policy', id).pipe(this.handleError);
  }
}
