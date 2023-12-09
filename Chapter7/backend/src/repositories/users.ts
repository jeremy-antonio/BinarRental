import { UserRequest } from "../models/dto/user";
import { User, UserEntity } from "../models/entity/user";
import { InternalServerError } from "../utils/errorclass";

class UserRepository {
  static async getAllUsers(): Promise<User[]> {
    try {
      const userQuery: User[] = await UserEntity.query().where("deleted_at", "");
      return userQuery;
    } catch (error) {
      throw new InternalServerError("Something went wrong");
    }
  }
  static async getUserById(id: number): Promise<User> {
    try {
      const userQuery: User[] = await UserEntity.query().where("id", id);
      const selectedUser: User = userQuery[0];
      return selectedUser;
    } catch (error) {
      throw new InternalServerError("Something went wrong");
    }
  }

  static async getUserByUsername(username: string): Promise<User> {
    try {
      const userQuery: User[] = await UserEntity.query().where("username", username);
      const selectedUser: User = userQuery[0];
      return selectedUser;
    } catch (error) {
      throw new InternalServerError("Something went wrong");
    }
  }

  static async getUserByEmail(email: string): Promise<User> {
    try {
      const userQuery: User[] = await UserEntity.query().where("email", email);
      const selectedUser: User = userQuery[0];
      return selectedUser;
    } catch (error) {
      throw new InternalServerError("Something went wrong");
    }
  }

  static async createUser(user: UserRequest): Promise<User> {
    try {
      const newUser = await UserEntity.query().insert({
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
      });
      return newUser;
    } catch (error) {
      throw new InternalServerError("Something went wrong");
    }
  }

  static async updateUser(id: number, user: UserRequest): Promise<User> {
    try {
      let payload: any = {};
      payload.password = user.password;
      payload.role = user.role;
      const findUser = await this.getUserById(id);
      if (findUser.email !== user.email) {
        payload.email = user.email;
      }
      if (findUser.username !== user.username) {
        payload.username = user.username;
      }
      const userQuery = await UserEntity.query().where("id", id).patch(payload).returning("*");
      const updatedUser = userQuery[0];
      return updatedUser;
    } catch (error) {
      console.log(error);
      throw new InternalServerError("Something went wrong");
    }
  }

  static async deleteUser(id: number): Promise<string> {
    try {
      const userQuery = await UserEntity.query().where("id", id).del();
      return "Success";
    } catch (error) {
      throw new InternalServerError("Something went wrong");
    }
  }
}

export default UserRepository;
