import { Request, Response } from "express";
import UsersTableModel from "../../models/users";
import _ from "lodash";
import bcrypt from "bcrypt";
import { errorResponse, successResponse } from "../../utils/lib/response";
import httpErrors from "../../utils/constants/httpErrors";
import { generateErrorMessage } from "../../utils/lib/generate-error-messages";
import path from "path";
import JWT from "../../utils/lib/jwt";

/**
 * @description register a new user
 * @param req Request object
 * @param res Response object
 * @returns ErrorResponse | SuccessResponse
 */
export const registerUser = async (req: Request, res: Response) => {
    try {
      const { name, email, password, confirm_password } = req.body;
  
      const error: any = {};
  
      if (!name) {
        error.name = "Name can not be empty";
      }
  
      if (!email) {
        error.name = "Email can not be empty";
      }
  
      if (!password) {
        error.name = "Password can not be empty";
      }
  
      // check if passwords match
      if (password != confirm_password) {
        error.name = "Passwords doesn't match";
      }
  
      const hasErrors: boolean = Object.values(error).length >= 1;
  
      if (hasErrors) {
        const errorMessage = generateErrorMessage(error);
        return errorResponse(res, httpErrors.ValidationError, errorMessage);
      }
  
      // check for duplicates
      const emailExists = await UsersTableModel.query().select().where("email", email);
  
      if (emailExists.length > 0) {
        return errorResponse(res, httpErrors.AccountExists, "User with this email already exists.");
      }
  
      // create new user
      const hash = await bcrypt.hash(password, 10);
      const newUser = {
        name: name,
        email: email,
        password: hash
      };
  
      // save new user
      await UsersTableModel.query().insert(newUser);
      
      return successResponse(res, "User created successfully", {});    
    } catch (error) {
      console.log(error);
      return errorResponse(res, httpErrors.ServerError, "Something went wrong");
    }
};

/**
 * @description login user
 * @param req Request object
 * @param res Response object
 * @returns ErrorResponse | SuccessResponse
 */
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // find user in db
    const user = await UsersTableModel.query().select().where("email", email);
    // console.log(user[0])

    if (user.length < 1) {
      return errorResponse(res, httpErrors.AccountNotFound, "User doesn't exist.");
    }

    // check password validity
    let passwordCorrect = await bcrypt.compare(password, user[0].password);

    if (!passwordCorrect) {
      return errorResponse(res, httpErrors.AccountError, "Wrong password.");
    }

    let name = user[0].email;
    let id = user[0].id;
    let expiresIn = "1h";

    // create and assign token
    const token = JWT.generateAccessToken(id, name, expiresIn);

    return successResponse(res, "User login successful", { token, data: { name } });
  } catch (error) {
    console.log(error);
    return errorResponse(res, httpErrors.ServerError, "Something went wrong");
  }
};