import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { OrderModule } from './modules/order/order.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [UserModule, OrderModule, ProductsModule,],
})
export class AppModule {}
