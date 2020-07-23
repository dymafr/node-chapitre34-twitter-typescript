import express, { Application, Response, Request } from 'express';
import morgan from 'morgan';
import path from 'path';
import index from './routes';
import errorHandler from 'errorhandler';
import './database';

export const app: Application = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

import './config/session.config';
import './config/passport.config';

app.use(morgan('short'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(index);

if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
} else {
  app.use((err: any, _: Request, res: Response) => {
    const code = err.code || 500;
    res.status(code).json({
      code: code,
      message: code === 500 ? null : err.message,
    });
  });
}
