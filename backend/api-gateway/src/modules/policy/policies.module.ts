import { Module } from '@nestjs/common';
import { PoliciesController } from './controllers/policy.controller';
import { PoliciesService } from './services/policies.service';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';

@Module({
  controllers: [PoliciesController],
  providers: [PoliciesService, ClientProxyFactoryService],
})
export class PolicyModule {}
