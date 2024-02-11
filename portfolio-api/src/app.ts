import { config } from "dotenv";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import passport from "passport";
import authRoutes from "./routes/authRoutes";

config();

const app = express();

app.use(morgan(process.env.ENVIRONMENT !== "prod" ? "dev" : "prod"));

app.use(
  session({
    secret: process.env.SESSION_SECRET ?? "",
    resave: true,
    saveUninitialized: false,
    cookie: { secure: process.env.ENVIRONMENT !== "prod" }, // Set true in prod
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

app.get("/", (req, res) => res.send("<span>Welcome!</span>"));

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${process.env.HOST_URL}:${PORT}`);
});
