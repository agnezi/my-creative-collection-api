import express from 'express';
import { box, boxes, create, prune, update } from './boxes.controllers';

const boxesRoutes = express.Router();

boxesRoutes.get('/', boxes);
boxesRoutes.get('/:id', box);
boxesRoutes.post('/create', create);
boxesRoutes.patch('/update', update);
boxesRoutes.delete('/delete', prune);

export { boxesRoutes };
