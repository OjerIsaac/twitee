import { Router } from "express";
import authRoute from "./authRoute";
import twitRoute from "./twitRoute";
import userRoute from "./userRoute";

const router = Router();

authRoute(router);
twitRoute(router);
userRoute(router);

export default router;