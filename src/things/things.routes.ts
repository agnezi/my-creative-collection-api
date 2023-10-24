import express from 'express';
import { create, prune, things, update } from './things.controllers';

const thingsRoutes = express.Router();

thingsRoutes.get('/:collectionId', things);
thingsRoutes.post('/create', create);
thingsRoutes.patch('/:id', update);
thingsRoutes.delete('/:id', prune);

export { thingsRoutes };
