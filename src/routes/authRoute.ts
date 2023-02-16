import { Router } from "express";
import { registerUser, loginUser } from '../controllers/authController/index';

export default (router: Router) => {
    router.post("/auth/register", registerUser);
    router.post("/auth/login", loginUser);
};