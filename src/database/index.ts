import mongoose from 'mongoose';
import conf from '../environment';

const env = conf[process.env.NODE_ENV as 'development' | 'production'];

console.log(env);

export const clientPromise = mongoose
  .connect(env.dbUrl)
  .then((m) => m.connection.getClient())
  .catch((err) => console.log(err));
