export default {
  dbUrl: process.env.MONGO_URL as string,
  cert: '/etc/letsencrypt/live/www.dyma-projects.site/fullchain.pem',
  key: '/etc/letsencrypt/live/www.dyma-projects.site/privkey.pem',
  portHttp: 80,
  portHttps: 443,
};
