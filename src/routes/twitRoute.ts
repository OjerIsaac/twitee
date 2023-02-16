import { Router } from "express";
import { postTwit } from '../controllers/twitController/index';
import { userAuth } from "../middleware/auth";

export default (router: Router) => {
    router.post("/twit/:userId/post-twit", userAuth, postTwit);
};