const express = require("express");
const nextjs = require("next");
const cnad = require("@bitc/cnad");

const env = env;
if (env === "staging" || env === "development" || env === "production") {
  cnad.config(process.env.NODE_DIR);
  cnad.watch([process.env.RESTART_FILE_PATH]);
  cnad.start();
}

const dev = env !== "production";
const app = nextjs({ dev });

const nextHandler = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("*", (req, res) => {
    return nextHandler(req, res);
  });

  const port = process.env.APP_PORT;

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${process.env.APP_PORT}`);
  });
});
