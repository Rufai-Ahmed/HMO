import cors from "cors";
import { config } from "dotenv";
import express, { Application, json } from "express";
import { mainApp } from "./mainApp";
import { dbConfig } from "./utils/dbConfig";
import cookieParser from "cookie-parser";
import session from "express-session";
config();

const app: Application = express();
const port: number = parseInt(process.env.PORT!);

app.use(cors());
app.use(json());

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,

    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "lax",
      secure: false,
    },
  })
);

mainApp(app);

const server = app.listen(port, () => {
  dbConfig();
});

process
  .on("uncaughtException", (error: Error) => {
    console.log(error);
    process.exit(1);
  })
  .on("unhandledRejection", (reason: any) => {
    console.log(reason);
    server.close(() => {
      process.exit(1);
    });
  });
