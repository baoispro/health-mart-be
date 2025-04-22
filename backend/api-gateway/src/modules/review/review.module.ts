import { Module } from '@nestjs/common';
import { ReviewController } from './controllers/review.controller';
import { ReviewService } from './services/review.service';
import { ReviewImgController} from './controllers/review_img.controller';
import { ReviewImgService} from './services/review_img.service';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';

@Module({
  controllers: [ReviewController, ReviewImgController],
  providers: [ReviewService, ReviewImgService, ClientProxyFactoryService],
})
export class ReviewModule {}
