import { Test, TestingModule } from '@nestjs/testing';
import { ReviewImgService } from './review-replies.service';

describe('ReviewImgService', () => {
  let service: ReviewImgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewImgService],
    }).compile();

    service = module.get<ReviewImgService>(ReviewImgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
