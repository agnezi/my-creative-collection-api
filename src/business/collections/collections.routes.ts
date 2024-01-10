import express from 'express';
import {
  collection,
  collections,
  create,
  prune,
  update,
} from './collections.controllers';

const collectionsRoutes = express.Router();

collectionsRoutes.get('/', collections);
collectionsRoutes.get('/:id', collection);
collectionsRoutes.post('/create', create);
collectionsRoutes.patch('/:id', update);
collectionsRoutes.delete('/:id', prune);

export { collectionsRoutes };
