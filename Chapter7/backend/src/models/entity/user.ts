import { Model, ModelObject } from "objection";
import postgresqlInstance from "../../../config/postgresql";

export class UserEntity extends Model {
  id?: number;
  username!: string;
  email!: string;
  password!: string;
  role!: string;

  static get tableName() {
    return "users";
  }
}

Model.knex(postgresqlInstance);

export type User = ModelObject<UserEntity>;
