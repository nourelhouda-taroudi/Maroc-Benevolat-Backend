import { Test, TestingModule } from '@nestjs/testing';
import { SuppressionController } from './suppression.controller';

describe('SuppressionController', () => {
  let controller: SuppressionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuppressionController],
    }).compile();

    controller = module.get<SuppressionController>(SuppressionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
