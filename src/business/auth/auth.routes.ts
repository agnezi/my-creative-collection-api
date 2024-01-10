import express, { RequestHandler } from 'express';
import { signUpValidator } from './auth.validator.middleware';
import { signIn, signUp } from './auth.controller';

const authRoutes = express.Router();

authRoutes.post('/sign-up', signUpValidator, signUp);
authRoutes.post('/sign-in', signIn);

export { authRoutes };
