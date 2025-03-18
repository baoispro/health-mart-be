import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port: 5432,
      username: 'postgres',
      password: '26052003',
      database: 'product_service',
      autoLoadEntities: true, // Tự động load entity
      synchronize: true, // Tạo bảng tự động (chỉ nên dùng trong phát triển)
    }),
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
