import { Model, ModelObject } from "objection";
import knexInstance from "../../../config/postgresql";
import { User, UserEntity } from "./user";

export class CarEntity extends Model {
  id?: number;
  name!: string;
  price!: string;
  car_foto_url?: string;
  created_by_id?: number;
  updated_by_id?: number;
  deleted_by_id?: number;
  // deleted_at?: Date;

  static get tableName() {
    return "cars";
  }

  static get relationMappings() {
    return {
      created_by: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserEntity,
        join: {
          from: "cars.created_by_id",
          to: "users.id",
        },
      },
      updated_by: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserEntity,
        join: {
          from: "cars.updated_by_id",
          to: "users.id",
        },
      },
      deleted_by: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserEntity,
        join: {
          from: "cars.deleted_by_id",
          to: "users.id",
        },
      },
    };
  }
}

Model.knex(knexInstance);

export type Car = ModelObject<CarEntity>;
