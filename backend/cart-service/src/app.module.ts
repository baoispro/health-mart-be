import { Module } from '@nestjs/common';
import { CartModule } from './modules/cart/cart.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CartModule,
    ConfigModule.forRoot(), // load .env
  ],
})
export class AppModule {}
