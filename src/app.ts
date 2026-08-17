import express, { Application, NextFunction, Response, Request } from 'express';
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
  // Quatre paramètres : c'est ce qui distingue un gestionnaire d'erreurs d'un
  // middleware ordinaire. Avec trois, celui-ci ne recevrait jamais aucune
  // erreur et toutes finiraient dans le gestionnaire par défaut d'Express.
  app.use((err: any, _: Request, res: Response, __: NextFunction) => {
    // err.code n'est pas un code HTTP : sur une erreur de système de fichiers
    // il vaut une chaîne comme ENOENT, et sur une violation de clé unique en
    // base il vaut 11000. res.status(11000) lève une exception.
    const code = err.status || err.statusCode || 500;
    res.status(code).json({
      code,
      message: code === 500 ? null : err.message,
    });
  });
}
