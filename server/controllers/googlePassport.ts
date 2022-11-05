import 'dotenv/config';

import passport from 'passport';
import { StrategyOptionsWithRequest, Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Request } from 'express';

const CLIENT_ID = process.env.CLIENT_ID_GOOGLE || '';
const CLIENT_SECRET = process.env.CLIENT_SECRET_GOOGLE || '';

const googleSettings: StrategyOptionsWithRequest = {
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: `${process.env.ROOT_URL}/auth/google/callback`,
  passReqToCallback: true,
};

type DoneType = (err: Error | null, user: Express.User) => void;

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

export default passport;
