import fs from "fs";
import https from "https";
import http from "http";
import { app } from "../app";
import conf from "../environment";

const env = conf[process.env.NODE_ENV as "development" | "production"];

http
  .createServer((req, res) => {
    // 308 plutôt que 301 : la redirection permanente 301 autorise les clients
    // à transformer un POST en GET, ce que 308 interdit.
    res.writeHead(308, {
      Location: `https://${
        req.headers.host!.split(":")[0] + ":" + env.portHttps
      }${req.url}`,
    });
    res.end();
  })
  .listen(env.portHttp);

https
  .createServer(
    {
      key: fs.readFileSync(env.key),
      cert: fs.readFileSync(env.cert),
    },
    app
  )
  .listen(env.portHttps);
