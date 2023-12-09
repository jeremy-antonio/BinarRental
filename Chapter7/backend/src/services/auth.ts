import { AuthGoogle, AuthRequest } from "../models/dto/auth";
import { AuthResponse } from "../models/dto/auth";
import { TokenPayload } from "../models/entity/auth";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserRepository from "../repositories/users";
import { User } from "../models/entity/user";
import { ErrorResponse } from "../models/dto/default";
import { BadRequestError, NotFoundError } from "../utils/errorclass";
import { OAuth2Client } from "google-auth-library";

class AuthService {
  static async login(user: AuthRequest): Promise<String> {
    try {
      const findUser = await UserRepository.getUserByEmail(user.email);
      if (!findUser) {
        throw new NotFoundError("User not found");
      }
      const match = bcrypt.compareSync(user.password, findUser.password);
      if (!match) {
        throw new BadRequestError("Username or password is wrong");
      }
      const payload: TokenPayload = {
        id: findUser.id || 0,
        username: findUser.username,
        email: findUser.email,
        role: findUser.role,
      };
      const token: String = jwt.sign(payload, process.env.JWT_SECRET || "", {
        expiresIn: "24h",
      });
      return token;
    } catch (error: any) {
      throw error;
    }
  }

  static async registerAdmin(user: User): Promise<User> {
    try {
      const newUser = await UserRepository.createUser(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  }
  static async loginGoogle(auth: AuthGoogle): Promise<String> {
    try {
      const client = new OAuth2Client(auth.clientId);
      const userInfo: any = await client.verifyIdToken({
        idToken: auth.credential,
        audience: auth.clientId,
      });
      const { email, name, picture } = userInfo.payload;

      const findUser = await UserRepository.getUserByEmail(email);
      if (!findUser) {
        throw new NotFoundError("User not found");
      }
      const payload: TokenPayload = {
        id: findUser.id || 0,
        username: findUser.username,
        email: findUser.email,
        role: findUser.role,
      };
      const token: String = jwt.sign(payload, process.env.JWT_SECRET || "", {
        expiresIn: "24h",
      });
      return token;
    } catch (error: any) {
      throw error;
    }
  }
}

export default AuthService;
