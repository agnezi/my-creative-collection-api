import { Request, Response } from 'express';
import * as boxesServices from './boxes.services';

export const boxes = (req: Request, res: Response) => {
  return res.json(boxesServices.boxes());
};

export const box = (req: Request, res: Response) => {
  return res.json(boxesServices.box());
};

export const create = (req: Request, res: Response) => {
  return res.json(boxesServices.create());
};

export const update = (req: Request, res: Response) => {
  return res.json(boxesServices.update());
};

export const prune = (req: Request, res: Response) => {
  return res.json(boxesServices.prune())
};
