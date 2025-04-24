import { Test, TestingModule } from '@nestjs/testing';
import { OrderPromotionsController } from './order_promotions.controller';

describe('OrderPromotionsController', () => {
  let controller: OrderPromotionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderPromotionsController],
    }).compile();

    controller = module.get<OrderPromotionsController>(
      OrderPromotionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
