import UserRepository from "../repositories/users";
import { UserRequest } from "../models/dto/user";
import { User } from "../models/entity/user";
import bcrypt from "bcrypt";
import { NotFoundError } from "../utils/errorclass";

class UserService {
  static async getAllUsers(): Promise<User[]> {
    try {
      const users: User[] = await UserRepository.getAllUsers();
      return users;
    } catch (error) {
      throw error;
    }
  }
  static async getUserById(id: number): Promise<User> {
    try {
      const user: User = await UserRepository.getUserById(id);
      if (!user) {
        throw new NotFoundError("User not found");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByUsername(username: string): Promise<User> {
    try {
      const user = await UserRepository.getUserByUsername(username);
      if (!user) {
        throw new NotFoundError("User not found");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async createUser(user: UserRequest): Promise<User> {
    try {
      const hashPassword = bcrypt.hashSync(user.password, 10);
      const newUser = await UserRepository.createUser({
        username: user.username,
        email: user.email,
        password: hashPassword,
        role: user.role,
      });
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(id: number, user: UserRequest): Promise<User> {
    try {
      let findUser = await UserRepository.getUserById(id);
      if (!findUser) {
        throw new NotFoundError("User not found");
      }
      const match = bcrypt.compareSync(user.password, findUser.password);
      if (!match) {
        user.password = bcrypt.hashSync(user.password, 10);
      }
      const updatedUser = await UserRepository.updateUser(id, user);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(id: number): Promise<string> {
    try {
      let findUser = await UserRepository.getUserById(id);
      if (!findUser) {
        throw new NotFoundError("User not found");
      }
      const userQuery = await UserRepository.deleteUser(id);
      return "Success";
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
