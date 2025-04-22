import { Test, TestingModule } from '@nestjs/testing';
import { DosagesController } from './dosages.controller';

describe('DosagesController', () => {
  let controller: DosagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DosagesController],
    }).compile();

    controller = module.get<DosagesController>(DosagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
