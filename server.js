require("child_process").execSync("ulimit -m unlimited; ulimit -v unlimited;", {
  stdio: "ignore",
});

const express = require("express");
const nextjs = require("next");
const cnad = require("@bitc/cnad");
const https = require("https");
const dotenv = require("dotenv");

dotenv.config();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const env = process.env.NODE_ENV;

cnad.config(process.env.NODE_DIR);
cnad.watch([process.env.RESTART_FILE_PATH]);
cnad.start();

const httpsOptions = {
  key: process.env.SSL_CERT_KEY,
  cert: process.env.SSL_CERT_CRT,
};

const dev = env !== "production";
const app = nextjs({ dev });

const nextHandler = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.all("*", (req, res) => {
      return nextHandler(req, res);
    });

    const port = process.env.APP_PORT;

    if (env === "production")
      server.listen(port, (err) => {
        if (err) throw err;
        console.log(
          `> Ready with Express on http://localhost:${process.env.APP_PORT}`
        );
      });
    else
      https.createServer(httpsOptions, server).listen(port, (err) => {
        if (err) throw err;
        console.log(
          `> Ready with Express + Local SSL on https://localhost:${process.env.APP_PORT}`
        );
      });
  })
  .catch((error) => {
    console.error("Error initializing application:", error);
    process.exit(1);
  });
