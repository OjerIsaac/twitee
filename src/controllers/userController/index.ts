import { Request, Response } from "express";
import UsersTableModel from "../../models/usersModel";
import TwitModel from "../../models/twitsModel";
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

    return successResponse(res, "User profile retrieved successfully", { user: user_profile });
  } catch (error) {
    console.log(error);
    return errorResponse(res, httpErrors.ServerError, "Something went wrong");
  }
};

/**
 * @description Retrieve all user twits, comments & likes
 * @param req Request object
 * @param res Response object
 * @returns ErrorResponse | SuccessResponse
 */
export const getUserTwits = async (req: Request, res: Response) => {
  try {
    let { id } = req.app.get("userDetails");

    let user_profile = await UsersTableModel.query().select('id', 'name', 'email').where({ 'id' : id })
      
    if (!user_profile) {
      return errorResponse(res, httpErrors.AccountNotFound, "User doesn't exist");
    }

    const twits = await TwitModel.query()
      .select('twits.*')
      .withGraphFetched('[comments]')
      .joinRelated('user')
      .where('user_id', id)
      .orderBy('twits.created_at', 'desc');

    return successResponse(res, "User twits retrieved successfully", { twits });
  } catch (error) {
    console.log(error);
    return errorResponse(res, httpErrors.ServerError, "Something went wrong");
  }
};

/**
 * @description logout user
 * @param req Request object
 * @param res Response object
 * @returns ErrorResponse | SuccessResponse
 */
export const logoutUser = async (req: Request, res: Response) => {
  try {
    delete req.headers.authorization; // remove the token from headers

    let { id } = req.app.get("userDetails");

    return successResponse(res, "User logout successful", { id });
  } catch (error) {
    console.log(error);
    return errorResponse(res, httpErrors.ServerError, "Something went wrong");
  }
};