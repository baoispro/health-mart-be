import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderShippingAddressModule } from './modules/order_shipping_address/order_shipping_address.module';
import { OrderItemsModule } from './modules/order_items/order_items.module';
import { OrderPromotionsModule } from './modules/order_promotions/order_promotions.module';
import { DiscountCodesModule } from './modules/discount_code/discount_code.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    OrdersModule,
    OrderShippingAddressModule,
    OrderItemsModule,
    OrderPromotionsModule,
    DiscountCodesModule,
  ],
})
export class AppModule {}
