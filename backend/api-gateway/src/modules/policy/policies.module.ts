import { Module } from '@nestjs/common';
import { PoliciesController } from './controllers/policy.controller';
import { PoliciesService } from './services/policies.service';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [PoliciesController],
  providers: [PoliciesService, ClientProxyFactoryService],
})
export class PolicyModule {}
