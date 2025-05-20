import { Test, TestingModule } from '@nestjs/testing';
import { DiscountCodesController } from './discount_code.controller';

describe('DiscountCodesController', () => {
  let controller: DiscountCodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscountCodesController],
    }).compile();

    controller = module.get<DiscountCodesController>(DiscountCodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
