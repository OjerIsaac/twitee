import { Request, Response } from "express";
import UsersTableModel from "../../models/usersModel";
import TwitModel from "../../models/twitsModel";
import CommentModel from "../../models/commentModel";
import _ from "lodash";
import { errorResponse, successResponse } from "../../utils/lib/response";
import httpErrors from "../../utils/constants/httpErrors";
import { generateErrorMessage } from "../../utils/lib/generate-error-messages";

/**
 * @description post a twit
 * @param req Request object
 * @param res Response object
 * @returns ErrorResponse | SuccessResponse
 */
export const postTwit = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { twit } = req.body;

        const error: any = {};

        if (!twit) {
            error.name = "Twit cannot be empty";
        }

        const hasErrors: boolean = Object.values(error).length >= 1;

        if (hasErrors) {
            const errorMessage = generateErrorMessage(error);
            return errorResponse(res, httpErrors.ValidationError, errorMessage);
        }

        const user = await UsersTableModel.query().findById(userId);
        
        if (!user) {
            return errorResponse(res, httpErrors.AccountNotFound, "User not found");
        }

        // check that this is the user
        let { id } = req.app.get("userDetails");

        if (id != userId) {
            return errorResponse(res, httpErrors.AccountNotFound, "Incorrect user ID");
        }

        let likes = 0; // default
  
        // Insert new twit into database
        const newTwit = await TwitModel.query().insert({
            twit,
            likes: likes,
            user_id: userId,
        });
  
      return successResponse(res, "Twit posted successfully", {...newTwit});
    } catch (error) {
        console.log(error);
        return errorResponse(res, httpErrors.ServerError, "Something went wrong");
    }
};

/**
 * @description delete a twit
 * @param req Request object
 * @param res Response object
 * @returns ErrorResponse | SuccessResponse
 */
export const deleteTwit = async (req: Request, res: Response) => {
    try {
        const { userId, twitId } = req.params;

        // check that this is the user
        let { id } = req.app.get("userDetails");

        if (id != userId) {
            return errorResponse(res, httpErrors.AccountNotFound, "Incorrect User ID");
        }

        // check that user posted that twit
        let findTwit = await TwitModel.query().select().where({ 'id' : twitId })
        // console.log(findTwit)
      
        if (findTwit.length < 1) {
            return errorResponse(res, httpErrors.AccountNotFound, "Can't find twit");
        }

        // delete twit
        await TwitModel.query().where({ 'id' : twitId, 'user_id': userId}).del()
  
        return successResponse(res, "Twit deleted successfully", {});
    } catch (error) {
      console.log(error);
      return errorResponse(res, httpErrors.ServerError, "Something went wrong");
    }
};

/**
 * @description post a comment
 * @param req Request object
 * @param res Response object
 * @returns ErrorResponse | SuccessResponse
 */
export const postComment = async (req: Request, res: Response) => {
    try {
        const { twitId, userId } = req.params;
        const { comment } = req.body;

        const error: any = {};

        if (!comment) {
            error.name = "Comment is empty";
        }

        const hasErrors: boolean = Object.values(error).length >= 1;

        if (hasErrors) {
            const errorMessage = generateErrorMessage(error);
            return errorResponse(res, httpErrors.ValidationError, errorMessage);
        }

        // find the twit, make sure it's present
        const twit = await TwitModel.query().findById(twitId);
        
        if (!twit) {
            return errorResponse(res, httpErrors.AccountNotFound, "Twit not found");
        }

        // check that the user is in the app
        const user = await UsersTableModel.query().findById(userId);
        
        if (!user) {
            return errorResponse(res, httpErrors.AccountNotFound, "Please register to comment");
        }

        // Insert new comment
        const newComment = await CommentModel.query().insert({
            comment,
            user_id: userId,
            twit_id: twitId,
        });
  
        return successResponse(res, "Comment posted successfully", { ...newComment });
    } catch (error) {
        console.log(error);
        return errorResponse(res, httpErrors.ServerError, "Something went wrong");
    }
};