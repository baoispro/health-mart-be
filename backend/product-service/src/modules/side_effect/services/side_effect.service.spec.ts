import { Test, TestingModule } from '@nestjs/testing';
import { SideEffectService } from './side_effect.service';

describe('SideEffectService', () => {
  let service: SideEffectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SideEffectService],
    }).compile();

    service = module.get<SideEffectService>(SideEffectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
