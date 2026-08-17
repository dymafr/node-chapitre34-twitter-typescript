import path from 'path';

export default {
  dbUrl: process.env.MONGO_URL as string,
  cert: path.join(__dirname, '../../ssl/local.crt'),
  key: path.join(__dirname, '../../ssl/local.key'),
  portHttp: 3000,
  portHttps: 3001,
};
