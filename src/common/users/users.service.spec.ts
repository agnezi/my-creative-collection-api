import { Test, TestingModule } from '@nestjs/testing';

import { BcryptConfigModule, BcryptConfigService } from '@app/bcrypt-config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaDbconfigModule } from '../../config/prisma-dbconfig/prisma-dbconfig.module';
import { PrismaDbconfigService } from '../../config/prisma-dbconfig/prisma-dbconfig.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { bcryptMock, prismaMock } from './stubs';

describe('UsersSerivice', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaDbconfigModule, BcryptConfigModule, JwtModule],
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: PrismaDbconfigService, useValue: prismaMock },
        {
          provide: BcryptConfigService,
          useValue: bcryptMock,
        },
      ],
      exports: [UsersService],
    }).compile();

    service = module.get(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('findOneAuth - should return a user for authentication service', async () => {
    const response = await service.findOneAuth({
      email: 'test@test.com',
    });

    expect(response).toStrictEqual({ name: 'Test' });
    expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'test@test.com' },
    });
  });

  it('findOne - should return a user', async () => {
    const response = await service.findOne({ id: '1', username: 'test' });

    expect(response).toStrictEqual({ name: 'Test' });
    expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      select: { name: true },
      where: { id: '1' },
    });
  });

  it('create - should create and return the new user', async () => {
    const user = {
      username: 'test',
      name: 'Test',
      email: 'test@test.com',
      password: 'test123',
    };

    const response = await service.create(user);

    expect(response).toStrictEqual({
      username: 'test',
      name: 'Test',
      email: 'test@test.com',
    });
    expect(prismaMock.user.create).toHaveBeenCalledTimes(1);
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: { ...user, password: 'test#123' },
      select: {
        name: true,
        username: true,
        id: true,
        createdAt: true,
        email: true,
      },
    });
  });
});
