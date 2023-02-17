import { Router } from "express";
import { getUserProfile, logoutUser, getUserTwits } from '../controllers/userController/index';
import { userAuth } from "../middleware/auth";

export default (router: Router) => {
    router.get("/user", userAuth, getUserProfile);
    router.get("/user-twits", userAuth, getUserTwits);
    router.post("/logout", logoutUser);
};