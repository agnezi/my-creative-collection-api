import type { Request, Response } from 'express';
import * as thingsService from './things.services';

export const things = (req: Request, res: Response) => {
  return res.json(thingsService.things());
};

export const create = (req: Request, res: Response) => {
  return res.json(thingsService.create());
};

export const update = (req: Request, res: Response) => {
  return res.json(thingsService.update());
};

export const prune = (req: Request, res: Response) => {
  return res.json(thingsService.prune());
};
