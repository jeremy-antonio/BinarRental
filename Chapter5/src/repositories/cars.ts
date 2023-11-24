import { raw } from "objection";
import { Car, CarEntity } from "../models/entity/car";
import { CarRequest } from "../models/dto/car";

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

  static async getCarById(id: number): Promise<Car> {
    try {
      const cars = await CarEntity.query().where("id", id);
      const selectedCar = cars[0];
      return selectedCar;
    } catch (error) {
      throw error;
    }
  }

  // Create Car
  static async createCar(car: Car): Promise<Car> {
    const createdCar = await CarEntity.query().insert({
      id: car.id,
      name: car.name,
      price: car.price,
      car_foto_url: car.car_foto_url,
      created_by_id: car.created_by_id,
    });

    return createdCar;
  }

  //Update Car
  static async updateCar(id: number, car: CarRequest): Promise<Car | null> {
    const updatedCar = await CarEntity.query().where("id", id).update({
      name: car.name,
      price: car.price,
      // car_foto_url: car.car_foto_url,
      updated_by_id: car.updated_by_id,
    });
    const newData = this.getCarById(id);
    return newData;
  }

  //Delete Car
  static async deleteCar(id: number): Promise<string> {
    try {
      const findCar = this.getCarById(id);
      if (!findCar) {
        throw new Error("Car not found");
      }
      const date = new Date();
      const deletedCar = await CarEntity.query().where("id", id).update({
        deleted_at: date,
      });
      return "Success";
    } catch (error) {
      return "Failed";
    }
  }
}

export default CarsRepository;
