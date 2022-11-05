import { NextFunction, Request, Response } from 'express';

type AuthType = {
  isLoggedIn: (req: Request, res: Response, next: NextFunction) => void;
};

export const authController: AuthType = {
  isLoggedIn: (req:Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.sendStatus(401);
    return next();
  },
};
