import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewService } from './services/review.service';
import { ReviewController } from './controllers/review.controller';
import { Review } from './entities/review.entity';
import { ReviewImage} from '../review_img/entities/review_img.entity';
import { ClientProxyFactoryService } from '../../utils/client-proxy.factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, ReviewImage]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService, ClientProxyFactoryService],
})
export class ReviewModule {}