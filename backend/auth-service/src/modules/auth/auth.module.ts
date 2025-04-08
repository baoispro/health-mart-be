import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthToken } from './entities/auth.entity';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';

@Module({
  imports: [TypeOrmModule.forFeature([AuthToken])],
  controllers: [AuthController],
  providers: [AuthService, ClientProxyFactoryService],
})
export class AuthModule {}
