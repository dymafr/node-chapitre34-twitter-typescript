"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    apps: [
        {
            name: 'twitter',
            script: './bin/www',
            instances: 'max',
            autorestart: true,
            watch: true,
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
};
