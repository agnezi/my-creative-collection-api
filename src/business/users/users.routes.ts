import express from 'express';
import { me, user } from './users.controllers';
import { extractToken } from 'middlewares/extractToken';


const usersRoutes = express.Router();

usersRoutes.use(extractToken);

usersRoutes.get('/me', me);
usersRoutes.patch('/user', user);

export { usersRoutes };
