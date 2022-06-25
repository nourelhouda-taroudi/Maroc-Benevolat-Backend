import { Test, TestingModule } from '@nestjs/testing';
import { SignalerService } from './signaler.service';

describe('SignalerService', () => {
  let service: SignalerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignalerService],
    }).compile();

    service = module.get<SignalerService>(SignalerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
