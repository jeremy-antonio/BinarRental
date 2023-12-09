import express, { Router } from "express";
import CarsHandler from "../handlers/cars";
import fileUpload from "../utils/uploadFileMemory";
import AuthMiddleWare from "../middlewares/auth";

const CarsRouter: Router = express.Router();

const carsHandler = new CarsHandler();

CarsRouter.get("/api/cars/size", AuthMiddleWare.authenticateAdmin, carsHandler.getCarsBySize);
CarsRouter.get("/api/cars", AuthMiddleWare.authenticateAdmin, carsHandler.getAllCars);
CarsRouter.get("/api/cars/:id", AuthMiddleWare.authenticateAdmin, carsHandler.getCarById);
CarsRouter.post("/api/cars", AuthMiddleWare.authenticateAdmin, fileUpload.single("car_picture"), carsHandler.createCar);
CarsRouter.patch("/api/cars/:id", AuthMiddleWare.authenticateAdmin, fileUpload.single("car_picture"), carsHandler.updateCar);
CarsRouter.delete("/api/cars/:id", AuthMiddleWare.authenticateAdmin, carsHandler.deleteCar);

export default CarsRouter;
