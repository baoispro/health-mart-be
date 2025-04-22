import { Test, TestingModule } from '@nestjs/testing';
import { UsagesController } from './usages.controller';

describe('UsagesController', () => {
  let controller: UsagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsagesController],
    }).compile();

    controller = module.get<UsagesController>(UsagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
