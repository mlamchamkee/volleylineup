import { NextFunction, Request, Response } from 'express';

import db from '../models/sqlModel';

export default {
  getLineups: async (req: any, res: Response, next: NextFunction) => {
    // console.log('userController.getLineups');
    const { userId } = res.locals;

    const queryString = `
    SELECT * FROM public.lineup
    WHERE user_id=$1
    `;
    const params = [userId];

    try {
      const result = await db.query(queryString, params);
      res.locals.lineup = result.rows;
      return next();
    } catch (err) {
      return next({
        log: `error in getUserId: ${err}`,
        status: 500,
        message: 'error occurred in getLineups middleware function',
      });
    }
  },
  postLineup: async (req: any, res: Response, next: NextFunction) => {
    const { userId } = res.locals;
    const { playerCount, lineup } = req.body;

    const queryString = `
    INSERT INTO public.lineup (user_id, player_count, lineup)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, player_count) DO UPDATE
    SET lineup = ($3)
    RETURNING (user_id, player_count, lineup)
    `;
    const params = [userId, playerCount, lineup];

    try {
      const result = await db.query(queryString, params);
      res.locals.lineup = result.rows;
      return next();
    } catch (err) {
      return next({
        log: `error in postLineup: ${err}`,
        status: 500,
        message: 'error occurred in postLineup middleware function',
      });
    }
  },
  deleteLineup: async (req: any, res: Response, next: NextFunction) => {
    // console.log('userController.postLineup');
    const { userId } = res.locals;
    const { description } = req.body;

    const queryString = `
    DELETE FROM public.lineup
    WHERE user_id=$1 AND description=$2
    `;
    const params = [userId, description];

    try {
      const result = await db.query(queryString, params);
      res.locals.lineup = result.rows;
      return next();
    } catch (err) {
      return next({
        log: `error in deleteLineup: ${err}`,
        status: 500,
        message: 'error occurred in deleteLineup middleware function',
      });
    }
  },
};
