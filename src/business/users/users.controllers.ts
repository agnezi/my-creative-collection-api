import { Request, Response } from 'express';
import * as usersService from 'business/users/users.services';

interface AuthRequest extends Request {
  user?: {
    username?: string;
  };
}

export const me = (req: AuthRequest, res: Response) => {
  return res.json(usersService.me(req?.user?.username));
};

export const user = (req: Request, res: Response) => {
  return res.json(usersService.user());
};
