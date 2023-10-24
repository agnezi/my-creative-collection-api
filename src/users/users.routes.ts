import express from 'express';
import { me, user } from './users.controllers';

const usersRoutes = express.Router();

usersRoutes.get('/me', me);
usersRoutes.patch('/user', user);

export { usersRoutes };
