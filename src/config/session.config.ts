import { app } from '../app';
import session from 'express-session';
import { clientPromise } from '../database';
import MongoStore from 'connect-mongo';

app.use(
  session({
    // Le secret signe le cookie de session : quiconque le connaît peut
    // fabriquer une session valide et se faire passer pour n'importe qui.
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // httpOnly à true, et non false : sinon n'importe quel script de la
      // page peut lire le cookie de session, et le vol de session devient la
      // conséquence directe de la moindre faille d'injection.
      httpOnly: true,
      // Le cookie n'est pas envoyé lors d'une navigation venue d'un autre
      // site, ce qui coupe court aux requêtes forgées entre sites :
      sameSite: 'lax',
      // En production, le cookie ne part que sur une connexion chiffrée :
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 14,
    },
    store: MongoStore.create({
      clientPromise: clientPromise as any,
      ttl: 60 * 60 * 24 * 14,
    }),
  })
);
