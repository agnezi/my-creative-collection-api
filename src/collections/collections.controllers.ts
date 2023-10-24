import type { Request, Response } from 'express';
import * as collectionsService from './collections.services';

export const collections = (req: Request, res: Response) => {
  return res.json(collectionsService.collections());
};

export const collection = (req: Request, res: Response) => {
  return res.json(collectionsService.collection());
};

export const create = (req: Request, res: Response) => {
  return res.json(collectionsService.create());
};

export const update = (req: Request, res: Response) => {
  return res.json(collectionsService.update());
};

export const prune = (req: Request, res: Response) => {
  return res.json(collectionsService.prune());
};
