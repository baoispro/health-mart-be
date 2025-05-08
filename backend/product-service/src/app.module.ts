import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './modules/products/products.module';
import { PharmacyStocksModule } from './modules/pharmacy_stock/pharmacy_stock.module';
import { SideEffectModule } from './modules/side_effect/side_effect.module';
import { IngredientsModule } from './modules/ingredients/ingredients.module';
import { PrecationsModule } from './modules/precautions/precautions.module';
import { UsagesModule } from './modules/usages/usages.module';
import { DosagesModule } from './modules/dosages/dosages.module';
import { StoragesModule } from './modules/storages/storages.module';
import { CategoriesModule } from './modules/categories/catrgories.module';

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
        autoLoadEntities: true, // Tự động load entity
        synchronize: false, // Tạo bảng tự động (chỉ nên dùng trong phát triển)
      }),
    }),
    ProductsModule,
    PharmacyStocksModule,
    SideEffectModule,
    IngredientsModule,
    PrecationsModule,
    UsagesModule,
    DosagesModule,
    StoragesModule,
    CategoriesModule,
  ],
})
export class AppModule {}
