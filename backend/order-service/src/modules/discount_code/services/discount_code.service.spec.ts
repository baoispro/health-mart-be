import { Test, TestingModule } from '@nestjs/testing';
import { DiscountCodesService } from './discount_code.service';

describe('DiscountCodesService', () => {
  let service: DiscountCodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscountCodesService],
    }).compile();

    service = module.get<DiscountCodesService>(DiscountCodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
