import { NextFunction, Request, Response } from 'express';

import db from '../models/sqlModel';

export default {
  getUserId: async (req: any, res: Response, next: NextFunction) => {
    // console.log('userController.getUserId');
    let email;
    if (req.user) email = req.user.email;

    const queryString = `
    SELECT user_id FROM public.user
    WHERE email=$1
    `;
    const params = [email];

    try {
      const result = await db.query(queryString, params);
      res.locals.userId = result.rows[0]?.user_id;
      return next();
    } catch (err) {
      return next({
        log: `error in getUserId: ${err}`,
        status: 500,
        message: 'error occurred in getUserId middleware function',
      });
    }
  },
  addUser: async (req: any, res: Response, next: NextFunction) => {
    const { email } = req.user;

    const queryString = `
    INSERT INTO public.user (email)
    VALUES ($1)
    RETURNING (user_id)
    `;
    const params = [email];

    if (res.locals.userId === undefined) {
      try {
        const result = await db.query(queryString, params);
        res.locals.userId = result.rows[0].user_id;
        return next();
      } catch (err) {
        return next({
          log: `error in getUserId: ${err}`,
          status: 500,
          message: 'error occurred in addUser middleware function',
        });
      }
    }
    return next();
  },
};
