import { boxesRoutes } from 'boxes/boxes.routes';
import { collectionsRoutes } from 'collections/collections.routes';
import express from 'express';
import { thingsRoutes } from 'things/things.routes';
import { usersRoutes } from 'users/users.routes';

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/boxes', boxesRoutes);
router.use('/collections', collectionsRoutes);
router.use('/things', thingsRoutes);

export { router };
