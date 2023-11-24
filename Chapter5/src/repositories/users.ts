import { raw } from "objection";
import { User, UserEntity } from "../models/entity/user";

class UsersRepository {
  static async getUsers(queryName: string): Promise<User[]> {
    let listUser: User[] = [];

    if (queryName) {
      listUser = await UserEntity.query().where(raw('lower("name")'), "like", `%${queryName}%`);
    } else {
      listUser = await UserEntity.query();
    }

    return listUser;
  }

  static async createUser(user: User): Promise<User> {
    const createdUser = await UserEntity.query().insert({
      email: user.email,
      name: user.name,
      role: user.role,
      password: user.password,
      profile_picture_url: user.profile_picture_url,
    });

    return createdUser;
  }

  static async getUserById(id: number): Promise<User> {
    try {
      const userQuery: User[] = await UserEntity.query().where("id", id);
      const selectedUser: User = userQuery[0];
      return selectedUser;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const user = await UserEntity.query().where(raw('lower("email")'), "=", email).first();

    if (user === undefined) {
      return null;
    }

    return user;
  }
}

export default UsersRepository;
