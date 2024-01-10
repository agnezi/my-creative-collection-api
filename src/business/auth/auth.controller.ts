import { RequestHandler } from 'express';
import * as authService from './auth.services';

export const signUp: RequestHandler = async (req, res, next) => {
  try {
    const newUserData = { ...req.body.newUserData };
    const data = await authService.signUp(newUserData);

    req.body.newUserData = undefined;
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export const signIn: RequestHandler = async (req, res, next) => {
  try {
    const data = await authService.signIn({
      username: req.body.username,
      password: req.body.password,
    });

    console.log(data);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};
