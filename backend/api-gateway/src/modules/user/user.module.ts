import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';

@Module({
  controllers: [UserController],
  providers: [UserService, ClientProxyFactoryService]
})
export class UserModule {}
