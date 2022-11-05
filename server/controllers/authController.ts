import 'dotenv/config';

import passport from 'passport';
import { StrategyOptionsWithRequest, Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { NextFunction, Request, Response } from 'express';

const CLIENT_ID_GOOGLE = process.env.CLIENT_ID_GOOGLE || '';

const CLIENT_SECRET_GOOGLE = process.env.CLIENT_SECRET_GOOGLE || '';

const googleSettings: StrategyOptionsWithRequest = {
  clientID: CLIENT_ID_GOOGLE,
  clientSecret: CLIENT_SECRET_GOOGLE,
  callbackURL: `${process.env.ROOT_URL}/auth/google/callback`,
  passReqToCallback: true,
};

type DoneType = (err: Error | null, user: Express.User) => void;

type AuthType = {
  isLoggedIn: (req: Request, res: Response, next: NextFunction) => void;
};

passport.use(
  new GoogleStrategy(
    googleSettings,
    ((request: Request, accessToken: string, refreshToken: string, profile: any, done: DoneType) => done(null, profile)
    ),
  ),
);

passport.serializeUser((user: Express.User, done: DoneType) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done: DoneType) => {
  done(null, user);
});

export const authController: AuthType = {
  isLoggedIn: (req:Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.sendStatus(401);
    return next();
  },
};

export default passport;
