import AuthService from "../services/auth";
import { AuthGoogle, AuthRequest } from "../models/dto/auth";
import { Request, Response } from "express";
import { DefaultResponse } from "../models/dto/default";
import UserService from "../services/users";
import { User } from "../models/entity/user";
import { BadRequestError } from "../utils/errorclass";

class AuthHandler {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!(email && password)) {
        throw new BadRequestError("Missing Field");
      }
      const payload: AuthRequest = {
        email: email,
        password: password,
      };
      const token = await AuthService.login(payload);
      return res.status(200).send({
        status: "OK",
        message: "Login success",
        data: {
          token: "Bearer " + token,
        },
      });
    } catch (error: any) {
      const response: DefaultResponse = {
        status: error.name,
        message: error.message,
        data: [],
      };
      return res.status(error.statusCode || 500).send(response);
    }
  }
  async currentUser(req: Request, res: Response) {
    try {
      const user: User = await UserService.getUserById(req.user.id || 0);
      return res.status(200).send({
        status: "OK",
        message: "Current user",
        data: {
          current_user: user,
        },
      });
    } catch (error: any) {
      const response: DefaultResponse = {
        status: error.name,
        message: error.message,
        data: [],
      };
      return res.status(error.statusCode || 500).send(response);
    }
  }

  async loginGoogle(req: Request, res: Response) {
    try {
      const auth: AuthGoogle = {
        credential: req.body.credential,
        clientId: req.body.clientId,
      };
      if (!(auth.credential && auth.clientId)) {
        throw new BadRequestError("Missing Field");
      }
      const token = await AuthService.loginGoogle(auth);
      return res.status(200).send({
        status: "OK",
        message: "Login success",
        data: {
          token: "Bearer " + token,
        },
      });
    } catch (error: any) {
      const response: DefaultResponse = {
        status: error.name,
        message: error.message,
        data: [],
      };
      return res.status(error.statusCode || 500).send(response);
    }
  }
}

export default AuthHandler;
