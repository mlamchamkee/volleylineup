import 'dotenv/config';

// import cookieSession from 'cookie-session';
import express, { NextFunction, Request, Response } from 'express';
// import passport from 'passport';
import path from 'path';
import { GlobalError } from '../utils/types';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport and cookie-session methods for OAuth 2
// app.use(
//   cookieSession({
//     name: 'github-auth-session',
//     keys: [process.env.key1 || '', process.env.key2 || '']
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// Routers

app.use('/assets', express.static(path.join(__dirname, '../client/assets')));
app.use(
  '/stylesheets',
  express.static(path.join(__dirname, '../client/stylesheets')),
);

// Serve bundle.js file
app.get('/bundle.js', (req: Request, res: Response) => res.status(200).sendFile(path.join(__dirname, '../dist/bundle.js')));

// Serve base HTML file
app.get('*', (req: Request, res: Response) => res.status(200).sendFile(path.join(__dirname, '../dist/index.html')));

// Global error handling middleware
app.use((err: GlobalError, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(err);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`);
});

export default app;
