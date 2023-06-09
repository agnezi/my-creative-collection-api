export const prismaMock = {
  user: {
    findUnique: jest.fn().mockResolvedValue({
      name: 'Test',
    }),
    create: jest.fn().mockResolvedValue({
      username: 'test',
      name: 'Test',
      email: 'test@test.com',
    }),
  },
};

export const bcryptMock = {
  hashPassword: (data: string) => 'test#123',
};
