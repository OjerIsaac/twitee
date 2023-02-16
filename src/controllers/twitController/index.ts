import { Request, Response } from "express";
import UsersTableModel from "../../models/usersModel";
import _ from "lodash";
import bcrypt from "bcrypt";
import { errorResponse, successResponse } from "../../utils/lib/response";
import httpErrors from "../../utils/constants/httpErrors";
import { generateErrorMessage } from "../../utils/lib/generate-error-messages";