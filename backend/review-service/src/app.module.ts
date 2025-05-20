import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReviewModule } from './modules/reviews/review.module';
import { ReviewImgModule } from './modules/review_img/review_img.module';
import { ReviewReplyModule } from './modules/review-replies/review_replies.module';

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
        synchronize: true, // Tạo bảng tự động (chỉ nên dùng trong phát triển)
        // ssl: {
        //   rejectUnauthorized: false,
        // },
      }),
    }),
    ReviewModule,
    ReviewImgModule,
    ReviewReplyModule,
  ],
})
export class AppModule {}
