import { Test, TestingModule } from '@nestjs/testing';
import { SideEffectController } from './side-effect.controller';

describe('SideEffectController', () => {
  let controller: SideEffectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SideEffectController],
    }).compile();

    controller = module.get<SideEffectController>(SideEffectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});