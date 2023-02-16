import { Router } from "express";
import authRoute from "./authRoute";
import twitRoute from "./twitRoute";

const router = Router();

authRoute(router);
twitRoute(router);

export default router;