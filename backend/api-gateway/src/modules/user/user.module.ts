import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [UserService, ClientProxyFactoryService],
})
export class UserModule {}
