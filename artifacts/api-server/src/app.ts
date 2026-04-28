import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// Reduce logging overhead in production
if (process.env.NODE_ENV === "development") {
  app.use(
    pinoHttp({
      logger,
      serializers: {
        req(req) {
          return {
            id: req.id,
            method: req.method,
            url: req.url?.split("?")[0],
          };
        },
        res(res) {
          return {
            statusCode: res.statusCode,
          };
        },
      },
    }),
  );
}

// Simplified CORS for Vercel
app.use(cors());

app.use(cookieParser());

// Safer body parsing
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

export default app;
