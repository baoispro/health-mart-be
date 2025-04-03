import { Module } from '@nestjs/common';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ClientProxyFactoryService],
})
export class AuthModule {}
