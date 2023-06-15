import { Test, TestingModule } from '@nestjs/testing';
import { ThingsController } from './things.controller';

describe('ThingsController', () => {
  let controller: ThingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThingsController],
    }).compile();

    controller = module.get<ThingsController>(ThingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
