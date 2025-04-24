import { Module } from '@nestjs/common';
import { ReviewController } from './controllers/review.controller';
import { ReviewService } from './services/review.service';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, ClientProxyFactoryService],
})
export class ReviewModule {}
