"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const app_1 = require("../app");
const environment_1 = __importDefault(require("../environment"));
const env = environment_1.default[process.env.NODE_ENV];
http_1.default
    .createServer((req, res) => {
    res.writeHead(301, {
        Location: `https://${req.headers.host.split(':')[0] + ':' + env.portHttps}${req.url}`,
    });
    res.end();
})
    .listen(env.portHttp);
https_1.default
    .createServer({
    key: fs_1.default.readFileSync(env.key),
    cert: fs_1.default.readFileSync(env.cert),
}, app_1.app)
    .listen(env.portHttps);
