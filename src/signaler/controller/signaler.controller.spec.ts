import { Test, TestingModule } from '@nestjs/testing';
import { SignalerController } from './signaler.controller';

describe('SignalerController', () => {
  let controller: SignalerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignalerController],
    }).compile();

    controller = module.get<SignalerController>(SignalerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
