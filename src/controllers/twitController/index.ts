import { Request, Response } from "express";
import UsersTableModel from "../../models/usersModel";
import TwitModel from "../../models/twitsModel";
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
  
        // Insert new twit into database
        const newTwit = await TwitModel.query().insert({
            twit,
            user_id: userId,
        });
  
      return successResponse(res, "Twit posted successfully", {});
    } catch (error) {
      console.log(error);
      return errorResponse(res, httpErrors.ServerError, "Something went wrong");
    }
  };