import CarRequest from "../models/dto/car";
import CarsRepository from "../repositories/cars";
import { Car } from "../models/entity/car";

class CarsService {
  static async getAllCars(): Promise<Car[]> {
    try {
      const cars = await CarsRepository.getAllCars();
      return cars;
    } catch (error) {
      throw error;
    }
  }
  static async getCarById(id: number): Promise<Car> {
    try {
      const cars = await CarsRepository.getCarById(id);
      return cars;
    } catch (error) {
      throw error;
    }
  }
  static async updateCar(adminId: number, id: number, car: CarRequest): Promise<Car | null> {
    try {
      const updatedCar = await CarsRepository.updateCar(adminId, id, car);
      return updatedCar;
    } catch (error) {
      throw error;
    }
  }
  static async createCar(adminId: number, car: CarRequest): Promise<Car> {
    try {
      const newCar = await CarsRepository.createCar(adminId, car);
      return newCar;
    } catch (error) {
      throw error;
    }
  }
  static async deleteCar(adminId: number, id: number): Promise<String> {
    try {
      const deletedCar = await CarsRepository.deleteCar(adminId, id);
      return deletedCar;
    } catch (error) {
      throw error;
    }
  }
  static async getCarsBySize(size: string): Promise<Car[]> {
    try {
      const cars: Car[] = await CarsRepository.getAllCars();
      const filteredCars: Car[] = cars.filter((car) => {
        if (car.size === size) {
          return car;
        }
      });
      return filteredCars;
    } catch (error) {
      throw error;
    }
  }
}

export default CarsService;
