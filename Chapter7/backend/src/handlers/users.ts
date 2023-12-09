import UserService from "../services/users";
import { UserRequest } from "../models/dto/user";
import { User } from "../models/entity/user";
import { DefaultResponse } from "../models/dto/default";
import { Request, Response } from "express";
import { BadRequestError } from "../utils/errorclass";

class UserHandler {
  async getAllUsers(req: Request, res: Response): Promise<any> {
    try {
      const users: User[] = await UserService.getAllUsers();
      const response: DefaultResponse = {
        status: "OK",
        message: "Success retrived data users",
        data: users,
      };
      return res.status(200).send(response);
    } catch (error: any) {
      const response: DefaultResponse = {
        status: error.name,
        message: error.message,
        data: [],
      };
      return res.status(error.statusCode || 500).send(response);
    }
  }
  async getUserById(req: Request, res: Response): Promise<any> {
    try {
      const id: number = parseInt(req.params.id);
      if (id === null) {
        throw new BadRequestError("user Id Params required");
      }
      const user = await UserService.getUserById(id);
      const response: DefaultResponse = {
        status: "OK",
        message: "Success retrived data user",
        data: { user: user },
      };
      return user;
    } catch (error: any) {
      const response: DefaultResponse = {
        status: error.name,
        message: error.message,
        data: [],
      };
      return res.status(error.statusCode || 500).send(response);
    }
  }
  async createUser(req: Request, res: Response): Promise<any> {
    try {
      const user: UserRequest = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      };
      if (!(user.email && user.password && user.password && user.role)) {
        throw new BadRequestError("Missing Field");
      }
      const createdUser = await UserService.createUser(user);
      const response: DefaultResponse = {
        status: "OK",
        message: "Success created data user",
        data: { user: createdUser },
      };
      return res.status(201).send(response);
    } catch (error: any) {
      const response: DefaultResponse = {
        status: error.name,
        message: error.message,
        data: [],
      };
      return res.status(error.statusCode || 500).send(response);
    }
  }
  async updateUserById(req: Request, res: Response): Promise<any> {
    try {
      const id: number = parseInt(req.params.id);
      if (id === null) {
        throw new BadRequestError("user Id Params required");
      }
      const user: UserRequest = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      };
      if (!(user.email && user.password && user.password && user.role)) {
        throw new BadRequestError("Missing Field");
      }
      const updatedUser = await UserService.updateUser(id, user);
      const response: DefaultResponse = {
        status: "OK",
        message: "Success updated data user",
        data: { user: updatedUser },
      };
      return res.status(200).send(response);
    } catch (error: any) {
      const response: DefaultResponse = {
        status: error.name,
        message: error.message,
        data: [],
      };
      return res.status(error.statusCode || 500).send(response);
    }
  }
  async deleteUserById(req: Request, res: Response): Promise<any> {
    try {
      const id: number = parseInt(req.params.id);
      if (id === null) {
        throw new BadRequestError("user Id Params required");
      }
      const deletedUser = await UserService.deleteUser(id);
      const response: DefaultResponse = {
        status: "OK",
        message: "Success deleted data user",
        data: [],
      };
      return res.status(200).send(response);
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

export default UserHandler;
