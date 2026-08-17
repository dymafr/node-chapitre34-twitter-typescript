// Ce fichier reste en JavaScript et garde l'export historique : le
// gestionnaire de processus le charge lui-même, sans passer par notre
// compilateur. Un export default dans un fichier .ts ne lui dirait rien.
module.exports = {
  apps: [
    {
      name: 'twitter',
      script: './build/bin/www.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
