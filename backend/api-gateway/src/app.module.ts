import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { OrderModule } from './modules/order/order.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { PolicyModule } from './modules/policy/policies.module';
import { ReviewModule } from './modules/review/review.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // RẤT QUAN TRỌNG
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    UserModule,
    OrderModule,
    ProductsModule,
    AuthModule,
    PolicyModule,
    ReviewModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
