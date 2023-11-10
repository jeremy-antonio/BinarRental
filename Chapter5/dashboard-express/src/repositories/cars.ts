import { raw } from "objection";
import { Car, CarEntity } from "../models/entity/car";

class CarsRepository {
  // Get Car
  static async getCars(queryName: string): Promise<Car[]> {
    const listCar = await CarEntity.query().where(raw('lower("name")'), "like", `%${queryName}%`);
    console.log("listCar", listCar);
    return listCar;
  }

  // Create Car
  static async createCar(car: Car): Promise<Car> {
    const createdCar = await CarEntity.query().insert({
      id: car.id,
      name: car.name,
      price: car.price,
      car_foto_url: car.car_foto_url,
    });

    return createdCar;
  }

  // static async updateCar() {}

  // static async deleteCar() {
  //   const deletedCar = await CarEntity.query().deleteById(id).returning("*");
  //   return deletedCar || null;
  // }
}

export default CarsRepository;
