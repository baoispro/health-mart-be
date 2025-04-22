import { Test, TestingModule } from '@nestjs/testing';
import { DosagesService } from './dosages.service';

describe('DosagesService', () => {
  let service: DosagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DosagesService],
    }).compile();

    service = module.get<DosagesService>(DosagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
