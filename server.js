import express from "express";
import nextjs from "next";

const dev = process.env.NODE_ENV !== "prod";
const app = nextjs({ dev });
const nextHandler = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("*", (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:5000");
  });
});