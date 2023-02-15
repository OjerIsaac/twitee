import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, Application } from "express";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import { errorResponse, successResponse } from "./utils/lib/response";
import httpErrors from "./utils/constants/httpErrors";

const app: Application = express();

// setup middleware
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(compression()); // compress all middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // expose public folder 

// index route
app.get("/", (req: Request, res: Response) => {
  return successResponse(res, "Welcome to Twitee API Service", {});
});

// handle 404 routes
app.all("*", (req: Request, res: Response) => {
  return errorResponse(res, httpErrors.NotFoundError, "Page Not Found :(");
});

export default app;
