import { Test, TestingModule } from '@nestjs/testing';
import { PharmacyProductService } from './pharmacy_product.service';

describe('PharmacyProductService', () => {
  let service: PharmacyProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PharmacyProductService],
    }).compile();

    service = module.get<PharmacyProductService>(PharmacyProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
