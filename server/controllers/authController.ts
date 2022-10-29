import 'dotenv/config';

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { GoogleSettingsType } from '../../utils/types';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';

const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';

const googleSettings: GoogleSettingsType = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback',
  passReqToCallback: true,
};

// passport.use(
//   new GoogleStrategy(
//     googleSettings,
//     ((request, accessToken, refreshToken, profile, done) => done(null, profile)
//     ),
//   ),
// );

passport.serializeUser((user, done) => {
  done(null, user);
});

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// export const authController = {
//   isLoggedIn(req, res, next) {
//     req.user ? next() : res.sendStatus(401);
//   },
// };

// export default passport;
export default passport;
