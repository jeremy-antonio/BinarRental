import { Request, Response } from "express";
import { DefaultResponse } from "../models/dto/default";
import { Car, CarEntity } from "../models/entity/car";
import { CarRequest } from "../models/dto/car";
import CarsService from "../services/cars";

class CarsHandler {
  async getCars(req: Request, res: Response) {
    const queryName: string = req.query.name as string;

    const carList: Car[] = await CarsService.getCars(queryName);

    const response: DefaultResponse = {
      status: "OK",
      message: "Success retrieving data",
      data: {
        cars: carList,
      },
    };

    res.status(200).send(response);
  }

  async createCar(req: Request, res: Response) {
    const payload: CarRequest = req.body;
    payload.car_foto_url = (req as any)["uploaded_car_foto_url"];

    // Payload validation
    if (!payload.name) {
      const response: DefaultResponse = {
        status: "BAD_REQUEST",
        message: "Name cannot be empty",
        data: {
          created_car: null,
        },
      };

      res.status(400).send(response);
    }

    const createdCar: Car = await CarsService.createCar(payload);

    const response: DefaultResponse = {
      status: "CREATED",
      message: "Car succesfully created",
      data: {
        created_car: createdCar,
      },
    };

    res.status(201).send(response);
  }

  async updateCar(req: Request, res: Response) {
    try {
      const payload: CarRequest = req.body;
      const id = req.params.id;
      // const updatedCar = await CarEntity.query().findById(id).patch(payload).returning("*");
      const carToUpdate: Car = {
        name: payload.name,
        price: payload.price,
        car_foto_url: payload.car_foto_url,
      };
      const updatedCar = await CarEntity.query().update(carToUpdate).where({ id }).returning("*");

      const response: DefaultResponse = {
        status: "UPDATED",
        message: "Car succesfully updated",
        data: {
          updatedCar,
        },
      };

      res.status(201).send(response);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCar(req: Request, res: Response) {
    const id = req.params.id;
    await CarEntity.query().where({ id }).del().throwIfNotFound().returning("*");
    const response: DefaultResponse = {
      status: "DELETED",
      message: "Car succesfully deleted",
      data: {},
    };

    res.status(201).send(response);
  }
}

export default CarsHandler;
