import CarsService from "../services/cars";
import CarRequest from "../models/dto/car";
import { DefaultResponse } from "../models/dto/default";
import { Request, Response } from "express";
import { Car } from "../models/entity/car";
import cloudinary from "../../config/cloudinary";

class CarsHandler {
  async getAllCars(req: Request, res: Response): Promise<any> {
    try {
      const cars: Car[] = await CarsService.getAllCars();
      const response: DefaultResponse = {
        status: "OK",
        message: "Success retrived data cars",
        data: cars,
      };
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async getCarById(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      if (id === null) {
        const response: DefaultResponse = {
          status: "ERROR",
          message: "Missing Params id",
          data: [],
        };
        return res.status(400).send(response);
      }
      const cars: Car = await CarsService.getCarById(id);
      if (!cars) {
        const response: DefaultResponse = {
          status: "ERROR",
          message: "Failed retrived data cars",
          data: [],
        };
        return res.status(404).send(response);
      }
      const response: DefaultResponse = {
        status: "OK",
        message: "Success retrived data cars",
        data: cars,
      };
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async createCar(req: Request, res: Response): Promise<any> {
    try {
      //prepare upload file
      const fileBase64 = req.file?.buffer.toString("base64");
      const file = `data:${req.file?.mimetype};base64,${fileBase64}`;
      const uploadedImage = await cloudinary.uploader.upload(file);
      const payload: CarRequest = {
        name: req.body.name,
        rent_per_day: req.body.rent_per_day,
        size: req.body.size.toUpperCase(),
        car_picture_url: uploadedImage.secure_url,
      };

      if (!(payload.name || payload.rent_per_day || payload.size || payload.car_picture_url)) {
        const response: DefaultResponse = {
          status: "ERROR",
          message: "Failed create data cars",
          data: [],
        };
        return res.status(400).send(response);
      }
      const newCar: Car = await CarsService.createCar(req.user.id || 0, payload);

      const response: DefaultResponse = {
        status: "OK",
        message: "Success create data cars",
        data: newCar,
      };
      return res.status(201).send(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
  async updateCar(req: Request, res: Response): Promise<any> {
    try {
      //prepare upload file
      const fileBase64 = req.file?.buffer.toString("base64");
      const file = `data:${req.file?.mimetype};base64,${fileBase64}`;
      const uploadedImage = await cloudinary.uploader.upload(file);
      const payload: CarRequest = {
        name: req.body.name,
        rent_per_day: req.body.rent_per_day,
        size: req.body.size.toUpperCase(),
        car_picture_url: uploadedImage.secure_url,
      };
      const id = parseInt(req.params.id);
      if (!(payload.name || payload.rent_per_day || payload.size || payload.car_picture_url)) {
        const response: DefaultResponse = {
          status: "ERROR",
          message: "Failed update data cars",
          data: [],
        };
        return res.status(400).send(response);
      }
      const newCar: Car | null = await CarsService.updateCar(req.user.id || 0, id, payload);

      const response: DefaultResponse = {
        status: "OK",
        message: "Success update data cars",
        data: newCar,
      };
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
  async getCarsBySize(req: Request, res: Response): Promise<any> {
    try {
      if (!req.query.size) {
        const response: DefaultResponse = {
          status: "ERROR",
          message: "Missing Query size",
          data: [],
        };
        return res.status(400).send(response);
      }
      const size = req.query.size as string;
      const cars: Car[] = await CarsService.getCarsBySize(size);
      if (cars.length === 0) {
        const response: DefaultResponse = {
          status: "ERROR",
          message: "Failed retrived data cars",
          data: [],
        };
        return res.status(404).send(response);
      }
      const response: DefaultResponse = {
        status: "OK",
        message: "Success retrived data cars",
        data: cars,
      };
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
  async deleteCar(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      const deletedCar = await CarsService.deleteCar(req.user.id || 0, id);
      if (deletedCar === "Failed") {
        const response: DefaultResponse = {
          status: "ERROR",
          message: "Failed delete data cars",
          data: [],
        };
        return res.status(400).send(response);
      }
      const response: DefaultResponse = {
        status: "OK",
        message: "Success delete data cars",
        data: [],
      };
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}

export default CarsHandler;
