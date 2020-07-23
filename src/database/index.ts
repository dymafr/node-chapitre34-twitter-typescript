import mongoose from 'mongoose';
import conf from '../environment';

const env = conf[process.env.NODE_ENV as 'development' | 'production'];

console.log(env);

mongoose
  .connect(env.dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log('connexion db ok !'))
  .catch((err) => console.log(err));
