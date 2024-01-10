import { boxesRoutes } from 'business/boxes/boxes.routes';
import { collectionsRoutes } from 'business/collections/collections.routes';
import express from 'express';
import { thingsRoutes } from 'business/things/things.routes';
import { usersRoutes } from 'business/users/users.routes';
import { authRoutes } from 'business/auth/auth.routes';

const router = express.Router();
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/boxes', boxesRoutes);
router.use('/collections', collectionsRoutes);
router.use('/things', thingsRoutes);

export { router };
