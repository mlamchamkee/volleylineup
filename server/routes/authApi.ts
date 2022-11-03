import express, { Request, Response } from 'express';

import passport, { authController } from '../controllers/authController';

import userController from '../controllers/userController';

const router = express.Router();

// router.get('/', authController.isLoggedIn, userController.getUserId, (req, res) =>
//   // console.log(req.body);
//   res.status(200));

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email'] }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    // successRedirect: '../../',
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

router.post('/logout', (req: Request, res: Response) =>
  // req.logout();
  res.redirect('../../'));

router.get('/failure', (req, res) => {
  res.send('unsuccessful login...');
});

export default router;
