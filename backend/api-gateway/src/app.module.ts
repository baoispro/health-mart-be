import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    UserModule,
  ],
})
export class AppModule {}
