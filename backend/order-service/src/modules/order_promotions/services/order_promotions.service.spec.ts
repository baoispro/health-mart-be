import { Test, TestingModule } from '@nestjs/testing';
import { OrderPromotionsService } from './order_promotions.service';

describe('OrderPromotionsService', () => {
  let service: OrderPromotionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderPromotionsService],
    }).compile();

    service = module.get<OrderPromotionsService>(OrderPromotionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
