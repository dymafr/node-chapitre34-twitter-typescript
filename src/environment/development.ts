import path from 'path';

export default {
  dbUrl:
    'mongodb+srv://alex:qwe@cluster0-l4izx.gcp.mongodb.net/twitter?retryWrites=true',
  cert: path.join(__dirname, '../../ssl/local.crt'),
  key: path.join(__dirname, '../../ssl/local.key'),
  portHttp: 3000,
  portHttps: 3001,
};
