import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ClientProxyFactoryService],
})
export class AuthModule {}
