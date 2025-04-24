import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewReplyService } from './services/review-replies.service';
import { ReviewReplyController } from './controllers/review-replies.controller';
import { ReviewReply } from './entities/review-replies.entity';
import { ClientProxyFactoryService } from '../../utils/client-proxy.factory';
import { Review } from '../reviews/entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewReply, Review])],
  controllers: [ReviewReplyController],
  providers: [ReviewReplyService, ClientProxyFactoryService],
})
export class ReviewReplyModule {}
