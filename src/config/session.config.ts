import { app } from '../app';
import session from 'express-session';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);

app.use(
  session({
    secret: 'je suis un secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 14,
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24 * 14,
    }),
  })
);
