import { Router } from "express";
import { getUserProfile, logoutUser } from '../controllers/userController/index';
import { userAuth } from "../middleware/auth";

export default (router: Router) => {
    router.get("/user", userAuth, getUserProfile);
    router.post("/logout", logoutUser);
};