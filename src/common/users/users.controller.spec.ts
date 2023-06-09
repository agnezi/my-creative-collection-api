import { Test, TestingModule } from '@nestjs/testing';

import { BcryptConfigModule } from '@app/bcrypt-config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaDbconfigModule } from '../../config/prisma-dbconfig/prisma-dbconfig.module';
import { PrismaDbconfigService } from '../../config/prisma-dbconfig/prisma-dbconfig.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { prismaMock } from './stubs';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaDbconfigModule, BcryptConfigModule, JwtModule],
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: PrismaDbconfigService, useValue: prismaMock },
      ],
      exports: [UsersService],
    }).compile();

    controller = module.get(UsersController);
    service = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findOne - should return a user', async () => {
    const result = Promise.resolve({ name: 'Test' });
    jest.spyOn(service, 'findOne').mockImplementation(() => result);

    const params = { id: '1', username: 'test' };
    const response = await controller.findOne(params);

    expect(response).toStrictEqual({ name: 'Test' });
  });

  it('create - should create an user and return it', async () => {
    const result = Promise.resolve({
      id: '1',
      name: 'Test',
      username: 'test',
      email: 'test@test.com',
      createdAt: new Date(8.64e15),
    });
    jest.spyOn(service, 'create').mockImplementation(() => result);

    const body = {
      name: 'Test',
      username: 'test',
      email: 'test@test.com',
      password: 'test123',
    };
    const response = await controller.create(body);

    expect(response).toStrictEqual({
      name: 'Test',
      username: 'test',
      email: 'test@test.com',
      id: '1',
      createdAt: new Date(8.64e15),
    });
  });
});
