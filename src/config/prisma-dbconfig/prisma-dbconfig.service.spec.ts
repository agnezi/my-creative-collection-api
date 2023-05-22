import { Test, TestingModule } from '@nestjs/testing';
import { PrismaDbconfigService } from './prisma-dbconfig.service';

describe('PrismaDbconfigService', () => {
  let service: PrismaDbconfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaDbconfigService],
    }).compile();

    service = module.get<PrismaDbconfigService>(PrismaDbconfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
