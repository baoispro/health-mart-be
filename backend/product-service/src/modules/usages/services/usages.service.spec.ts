import { Test, TestingModule } from '@nestjs/testing';
import { UsagesService } from './usages.service';

describe('UsagesService', () => {
  let service: UsagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsagesService],
    }).compile();

    service = module.get<UsagesService>(UsagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
