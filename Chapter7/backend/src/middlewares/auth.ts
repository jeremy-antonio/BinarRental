import jwt from "jsonwebtoken";
import { TokenPayload } from "../models/entity/auth";
import { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/users";
import { ForbiddenError, UnauthorizedError } from "../utils/errorclass";
import { DefaultResponse } from "../models/dto/default";

class AuthMiddleWare {
  static async authenticateSuperAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      let accessToken;
      if (authHeader && authHeader.startsWith("Bearer")) {
        accessToken = authHeader.split(" ")[1];
      } else {
        throw new UnauthorizedError("Access token not found");
      }
      const payload = jwt.verify(accessToken, process.env.JWT_SECRET || "") as TokenPayload;
      const findUser = await UserRepository.getUserById(payload.id);
      if (!findUser) {
        throw new UnauthorizedError("User not found");
      }
      if (findUser.role !== "SUPERADMIN") {
        throw new ForbiddenError("You are not allowed to access this resource");
      }
      req.user = findUser;
      next();
    } catch (error: any) {
      const response: DefaultResponse = {
        status: error.name,
        message: error.message,
        data: [],
      };
      return res.status(error.statusCode || 400).send(response);
    }
  }
  static async authenticateAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      let accessToken;
      if (authHeader && authHeader.startsWith("Bearer")) {
        accessToken = authHeader.split(" ")[1];
      } else {
        throw new UnauthorizedError("Access token not found");
      }
      const payload = jwt.verify(accessToken, process.env.JWT_SECRET || "") as TokenPayload;
      const findUser = await UserRepository.getUserById(payload.id);
      if (!findUser) {
        throw new UnauthorizedError("User not found");
      }
      if (!(findUser.role === "SUPERADMIN" || findUser.role === "ADMIN")) {
        throw new ForbiddenError("You are not allowed to access this resource");
      }
      req.user = findUser;
      next();
    } catch (error: any) {
      const response: DefaultResponse = {
        status: error.name,
        message: error.message,
        data: [],
      };
      return res.status(error.statusCode || 400).send(response);
    }
  }
}

export default AuthMiddleWare;
