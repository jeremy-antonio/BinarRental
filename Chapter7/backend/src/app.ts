import express, { Application } from "express";
import UsersHandler from "./handlers/users";
import uploadFileUtil from "./utils/uploadFileMemory";
import AuthHandler from "./handlers/auth";
import AuthMiddleware from "./middlewares/auth";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerConfig } from "./utils/swaggerOption";
import dotenv from "dotenv";
import cors from "cors";
import CarsHandler from "./handlers/cars";
// import TweetsHandler from "./handlers/tweets";
dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cors());

// Init handlers
const usersHandler = new UsersHandler();
const authHandler = new AuthHandler();
const carsHandler = new CarsHandler();
// const tweetsHandler = new TweetsHandler();

// Swagger
const swaggerSpec = swaggerJsdoc(swaggerConfig);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Define routes
// Users
app.get(
  "/api/users",
  AuthMiddleware.authenticate,
  // TODO: add role checking middleware
  usersHandler.getUsers
);
app.post(
  "/api/users",
  uploadFileUtil.single("profile_picture"), // single file
  // uploadFileUtil.array('profile_pictures'), // multiple files
  usersHandler.createUser
);

// Auth
app.post("/api/auth/register", authHandler.register);
app.post("/api/auth/login", authHandler.login);
app.get("/api/auth/me", AuthMiddleware.authenticate, authHandler.getLoggedInUser);

// Cars
app.get("/api/cars", carsHandler.getAllCars);
app.post("/api/cars", AuthMiddleware.authenticateAdmin, carsHandler.createCar);
app.patch("/api/cars/:id", AuthMiddleware.authenticateAdmin, carsHandler.updateCar);
app.delete("/api/cars/:id", AuthMiddleware.authenticateAdmin, carsHandler.deleteCar);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.APP_PORT}`);
});
