import type { Request, Response } from 'express';
import { me } from 'users/users.controllers';
import * as usersServices from 'users/users.services';

jest.mock('users/users.services');

let usersServiceMock: jest.Mocked<typeof usersServices>;

describe('users controllers', () => {
  it('should return an user', () => {
    const request = {} as Request;
    const response = {
      json: jest.fn(),
    } as unknown as Response;

    const user = {
      id: '1',
      username: 'test',
    };

    usersServiceMock.me.mockResolvedValue;

    expect(response.json).toHaveBeenCalled();
    expect(me(request, response)).toBe(user);
  });
});
