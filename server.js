const express = require("express");
const nextjs = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = nextjs({ dev });
const nextHandler = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("*", (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(process.env.APP_PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${process.env.APP_PORT}`);
  });
});
