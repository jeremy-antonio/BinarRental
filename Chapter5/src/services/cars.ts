import { promises } from "dns";
import cloudinary from "../../config/cloudinary";
import { CarRequest } from "../models/dto/car";
import { Car } from "../models/entity/car";
import CarsRepository from "../repositories/cars";
import { UserEntity } from "../models/entity/user";

class CarsService {
  static async getCars(queryName: string): Promise<Car[]> {
    const listCar = await CarsRepository.getCars(queryName);
    return listCar;
  }

  static async createCar(car: CarRequest): Promise<Car> {
    try {
      const fileBase64 = car.car_foto_url?.buffer.toString("base64");
      const file = `data:${car.car_foto_url?.mimetype};base64,${fileBase64}`;
      const uploadedFile = await cloudinary.uploader.upload(file);

      const carToCreate: Car = {
        id: car.id as number,
        name: car.name,
        price: car.price,
        car_foto_url: uploadedFile.url,
      };
      const createdCar = await CarsRepository.createCar(carToCreate);

      return createdCar;
    } catch (error) {
      throw error;
    }
  }

  // static async updateCar(car: CarRequest): Promise<Car> {

  // }

  // static async deleteCar() {}
}

export default CarsService;
