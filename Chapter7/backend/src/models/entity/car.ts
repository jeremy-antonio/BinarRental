import { Model, ModelObject } from "objection";
import postgresqlInstance from "../../../config/postgresql";

export class CarEntity extends Model {
  id?: number;
  name!: string;
  rent_per_day!: bigint;
  size!: string;
  car_picture_url!: string;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  static get tableName() {
    return "cars";
  }
}

Model.knex(postgresqlInstance);

export type Car = ModelObject<CarEntity>;
