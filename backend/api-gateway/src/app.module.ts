import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { OrderModule } from './modules/order/order.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { PolicyModule } from './modules/policy/policies.module';

@Module({
  imports: [UserModule, OrderModule, ProductsModule, AuthModule, PolicyModule],
})
export class AppModule {}
