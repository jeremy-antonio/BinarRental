import { raw } from "objection";
import { Car, CarEntity } from "../models/entity/car";
import { UserEntity } from "../models/entity/user";

class CarsRepository {
  // Get Car
  static async getCars(queryName: string): Promise<Car[]> {
    let listCar: Car[] = [];

    if (queryName) {
      listCar = await CarEntity.query().where(raw('lower("name")'), "like", `%${queryName}%`);
      // .withGraphFetched("[created_by, updated_by, deleted_by]")
    } else {
      listCar = await CarEntity.query();
    }

    return listCar;
  }

  // Create Car
  static async createCar(car: Car): Promise<Car> {
    const createdCar = await CarEntity.query().insert({
      id: car.id,
      name: car.name,
      price: car.price,
      car_foto_url: car.car_foto_url,
      // created_by_id: car.created_by_id,
      // updated_by_id: car.updated_by_id,
      // deleted_by_id: car.deleted_by_id,
      // deleted_at: car.deleted_at,
    });

    return createdCar;
  }

  // static async updateCar() {}

  // static async deleteCar() {}
}

export default CarsRepository;
