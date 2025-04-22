import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewImgService } from './services/review_img.service';
import { ReviewImgController } from './controllers/review_img.controller';
import { ReviewImage } from './entities/review_img.entity';
import { Review} from '../reviews/entities/review.entity';
import { ClientProxyFactoryService } from '../../utils/client-proxy.factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, ReviewImage]),
  ],
  controllers: [ReviewImgController],
  providers: [ReviewImgService, ClientProxyFactoryService],
})
export class ReviewImgModule {}