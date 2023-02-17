import { Router } from "express";
import { postTwit, deleteTwit, postComment } from '../controllers/twitController/index';
import { userAuth } from "../middleware/auth";

export default (router: Router) => {
    router.post("/twit/:userId/post-twit", userAuth, postTwit);
    router.delete("/twit/:userId/delete-twit/:twitId", userAuth, deleteTwit);
    router.post("/twit/:twitId/post-comment/:userId", userAuth, postComment);
};