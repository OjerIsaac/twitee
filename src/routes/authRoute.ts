import { Router } from "express";
import { registerUser } from '../controllers/authController/index';

export default (router: Router) => {
    router.post("/auth/register", registerUser);
};