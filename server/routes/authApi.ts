import express, { Request, Response } from 'express';

import googlePassport from '../controllers/googlePassport';
import facebookPassport from '../controllers/facebookPassport';

import userController from '../controllers/userController';

const router = express.Router();

// router.get('/', authController.isLoggedIn, userController.getUserId, (req, res) =>
//   // console.log(req.body);
//   res.status(200));

router.get(
  '/google',
  googlePassport.authenticate('google', { scope: ['email'] }),
);

router.get(
  '/google/callback',
  googlePassport.authenticate('google', {
    failureRedirect: '/failure',
  }),
  userController.getUserId,
  userController.addUser,
  (req: any, res: Response): void => {
    res.cookie('email', req.user.email);
    res.cookie('picture', req.user.picture);
    res.cookie('isLoggedIn', true);
    return res.redirect('../../');
  },
);

router.get(
  '/facebook',
  facebookPassport.authenticate('facebook', { scope: ['email'] }),
);

router.get(
  '/facebook/callback',
  facebookPassport.authenticate('facebook', {
    failureRedirect: '/failure',
  }),
  userController.getUserId,
  userController.addUser,
  (req: any, res: Response): void => {
    res.cookie('email', req.user._json.email);
    res.cookie('picture', req.user._json.picture.data.url);
    res.cookie('isLoggedIn', true);
    return res.redirect('../../../');
  },
);

router.post('/logout', (req: Request, res: Response) =>
  // req.logout();
  res.redirect('../../'));

router.get('/failure', (req, res) => {
  res.send('unsuccessful login...');
});

export default router;
