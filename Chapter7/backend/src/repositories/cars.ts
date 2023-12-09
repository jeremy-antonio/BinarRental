import { Car, CarEntity } from "../models/entity/car";
import CarRequest from "../models/dto/car";

class CarsRepository {
  static async getAllCars(): Promise<Car[]> {
    try {
      const cars = await CarEntity.query().whereNull("deleted_at");
      return cars;
    } catch (error) {
      throw error;
    }
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

  static async createCar(adminId: number, car: CarRequest): Promise<Car> {
    try {
      const date = new Date();
      const newCar = await CarEntity.query().insert({
        name: car.name,
        cost_per_day: car.cost_per_day,
        size: car.size,
        car_picture_url: car.car_picture_url,
        created_by: adminId,
        created_at: date,
      });
      return newCar;
    } catch (error) {
      throw error;
    }
  }

  static async updateCar(adminId: number, id: number, car: CarRequest): Promise<Car | null> {
    try {
      const date = new Date();
      const updatedCar = await CarEntity.query().where("id", id).update({
        name: car.name,
        cost_per_day: car.cost_per_day,
        size: car.size,
        car_picture_url: car.car_picture_url,
        updated_at: date,
        updated_by: adminId,
      });
      const newData = this.getCarById(id);
      return newData;
    } catch (error) {
      throw error;
    }
  }

  static async deleteCar(adminId: number, id: number): Promise<string> {
    try {
      const findCar = this.getCarById(id);
      if (!findCar) {
        throw new Error("Car not found");
      }
      const date = new Date();
      const deletedCar = await CarEntity.query().where("id", id).update({
        deleted_by: adminId,
        deleted_at: date,
      });
      return "Success";
    } catch (error) {
      return "Failed";
    }
  }
}

export default CarsRepository;
