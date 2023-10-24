import { Request, Response } from 'express';
import * as usersService from 'users/users.services';

export const me = (req: Request, res: Response) => {
  return res.json(usersService.me());
};

export const user = (req: Request, res: Response) => {
  return res.json(usersService.user());
};
