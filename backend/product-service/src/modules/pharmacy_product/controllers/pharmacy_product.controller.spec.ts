import { Test, TestingModule } from '@nestjs/testing';
import { PharmacyProductController } from './pharmacy_product.controller';

describe('PharmacyProductController', () => {
  let controller: PharmacyProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PharmacyProductController],
    }).compile();

    controller = module.get<PharmacyProductController>(
      PharmacyProductController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
