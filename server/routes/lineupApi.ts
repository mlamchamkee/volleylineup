import express, { Request, Response, Router } from 'express';

import userController from '../controllers/userController';
import lineupController from '../controllers/lineupController';

const router: Router = express.Router();

// Route to add user to the SQL DB upon signing in to app for first time
router.post('/:email', (req, res) => {
  res.status(200).send('User added!');
});

// Route to get lineups for a user
router.get(
  '/',
  userController.getUserId,
  lineupController.getLineups,
  (req, res) => res.status(200).json(res.locals.lineup),
);

// Route to add or update lineup for a user
router.post(
  '/',
  userController.getUserId,
  lineupController.postLineup,
  (req, res) => res.status(200).json(res.locals.lineup),
);

// Route to delete lineup for a user
router.delete(
  '/',
  userController.getUserId,
  lineupController.deleteLineup,
  (req, res) => res.status(200).json(res.locals.lineup),
);
export default router;
