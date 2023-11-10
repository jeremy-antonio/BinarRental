import { promises } from "dns";
import { CarRequest } from "../models/dto/car";
import { Car } from "../models/entity/car";
import CarsRepository from "../repositories/cars";

class CarsService {
  static async getCars(queryName: string): Promise<Car[]> {
    const listCar = await CarsRepository.getCars(queryName);
    return listCar;
  }

  static async createCar(car: CarRequest): Promise<Car> {
    const carToCreate: Car = {
      id: car.id,
      name: car.name,
      price: car.price,
      car_foto_url: car.car_foto_url,
    };
    const createdCar = await CarsRepository.createCar(carToCreate);

    return createdCar;
  }

  // static async updateCar(car: CarRequest): Promise<Car> {

  // }

  // static async deleteCar() {}
}

export default CarsService;
