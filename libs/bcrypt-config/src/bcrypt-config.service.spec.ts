import { Test, TestingModule } from '@nestjs/testing';
import { BcryptConfigService } from './bcrypt-config.service';

describe('BcryptConfigService', () => {
  let service: BcryptConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptConfigService],
    }).compile();

    service = module.get<BcryptConfigService>(BcryptConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
