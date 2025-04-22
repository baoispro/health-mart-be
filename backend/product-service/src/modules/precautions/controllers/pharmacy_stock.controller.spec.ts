import { Test, TestingModule } from '@nestjs/testing';
import { PharmacyStockController } from './precaution.controller';

describe('PharmacyStockController', () => {
  let controller: PharmacyStockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PharmacyStockController],
    }).compile();

    controller = module.get<PharmacyStockController>(PharmacyStockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
