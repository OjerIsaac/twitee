import { Request, Response } from "express";
import UsersTableModel from "../../models/usersModel";
import _ from "lodash";
import { errorResponse, successResponse } from "../../utils/lib/response";
import httpErrors from "../../utils/constants/httpErrors";

/**
 * @description Retrieve user profile
 * @param req Request object
 * @param res Response object
 * @returns ErrorResponse | SuccessResponse
 */
export const getUserProfile = async (req: Request, res: Response) => {
    try {
        let { id } = req.app.get("userDetails");

        let user_profile = await UsersTableModel.query().select('id', 'name', 'email').where({ 'id' : id })
        
        if (!user_profile) {
            return errorResponse(res, httpErrors.AccountNotFound, "User doesn't exist");
        }
  
      return successResponse(res, "User profile retrieved successfully", { user_profile });
    } catch (error) {
      console.log(error);
      return errorResponse(res, httpErrors.ServerError, "Something went wrong");
    }
  };
  