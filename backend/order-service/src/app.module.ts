import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'order_service',
      autoLoadEntities: true, // Tự động load entity
      synchronize: true, // Tạo bảng tự động (chỉ nên dùng trong phát triển)
    }),
    OrdersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
