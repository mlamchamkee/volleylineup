import 'dotenv/config';

import passport from 'passport';
import { StrategyOptionWithRequest, Strategy } from 'passport-facebook';
import { Request } from 'express';

const CLIENT_ID = process.env.CLIENT_ID_FACEBOOK || '';
const CLIENT_SECRET = process.env.CLIENT_SECRET_FACEBOOK || '';

const settings: StrategyOptionWithRequest = {
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: `${process.env.ROOT_URL}/auth/facebook/callback`,
  passReqToCallback: true,
  profileFields: ['email', 'picture'],
};

type DoneType = (err: Error | null, user: Express.User) => void;

passport.use(
  new Strategy(
    settings,
    ((
      request: Request,
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: DoneType,
    ) => done(null, profile)
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
