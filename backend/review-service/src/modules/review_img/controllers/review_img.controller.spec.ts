import { Test, TestingModule } from '@nestjs/testing';
import { ReviewImgController } from './review_img.controller';

describe('ReviewImgController', () => {
  let controller: ReviewImgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewImgController],
    }).compile();

    controller = module.get<ReviewImgController>(ReviewImgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
