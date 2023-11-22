import { Model, ModelObject } from "objection";
import knexInstance from "../../../config/postgresql";

export class CarEntity extends Model {
  id?: number;
  name!: string;
  price!: string;
  car_foto_url?: string;

  static get tableName() {
    return "cars";
  }
}

Model.knex(knexInstance);

export type Car = ModelObject<CarEntity>;
