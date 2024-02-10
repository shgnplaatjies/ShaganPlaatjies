import dotenv from "dotenv";
import express from "express";
import session from "express-session";

dotenv.config();

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET ?? "",
    resave: true,
    saveUninitialized: false,
    cookie: { secure: process.env.ENVIRONMENT !== "prod" }, // Set true in prod
  })
);

app.get("/", (req, res) => res.send("<h1>Hello, World</h1>"));

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${process.env.HOST_URL}:${PORT}`);
});
