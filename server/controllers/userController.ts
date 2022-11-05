import 'dotenv/config';

import { NextFunction, Request, Response } from 'express';
import { createHash } from 'node:crypto';

import db from '../models/sqlModel';

// const {
//   createHash,
// } = await import('node:crypto');
export default {
  getUserId: async (req: any, res: Response, next: NextFunction) => {
    let hashEmail;
    if (req.user) {
      const hash = createHash('sha256');
      hash.update(req.user.email + process.env.HASH_KEY);
      hashEmail = hash.digest('hex');
    }

    const queryString = `
    SELECT user_id FROM public.user
    WHERE email=$1
    `;
    const params = [hashEmail];

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
    let hashEmail;
    if (req.user) {
      const hash = createHash('sha256');
      hash.update(req.user.email + process.env.HASH_KEY);
      hashEmail = hash.digest('hex');
    }

    const queryString = `
    INSERT INTO public.user (email)
    VALUES ($1)
    RETURNING (user_id)
    `;
    const params = [hashEmail];

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
