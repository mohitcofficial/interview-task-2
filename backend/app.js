import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middleware/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { rateLimit } from "express-rate-limit";

config({
  path: "./config/config.env",
});

const app = express();
const limiter = rateLimit({
  windowMs: 10 * 1000,
  limit: 20,
  standardHeaders: "draft-7",
  message: "Too many request, please try again later",
});

app.use(limiter);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

import user from "./routes/userRoutes.js";
import blog from "./routes/blogRoutes.js";

app.use("/api/v1", user);
app.use("/api/v1", blog);

app.use(ErrorMiddleware);
export default app;
