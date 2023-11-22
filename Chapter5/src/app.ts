import express, { Application } from "express";
import uploadCloudUtil from "./utils/uploadCloud";
import CarsHandler from "./handlers/cars";
import AuthHandler from "./handlers/auth";
import AuthMiddleware from "./middlewares/auth";
import SwaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerConfig } from "./utils/swaggerOption";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT: number = 8081;

app.use(express.json());

// Init handlers
const carsHandler = new CarsHandler();
const authHandler = new AuthHandler();

// Swagger
const swaggerSpec = swaggerJSDoc(swaggerConfig);
app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));

// Define routes
// CRUD Cars add more middleware
app.get("/api/cars", carsHandler.getCars);
app.post("/api/cars", uploadCloudUtil.single("car_foto_url"), carsHandler.createCar);
app.put("/api/cars/:id", carsHandler.updateCar);
app.delete("/api/cars/:id", carsHandler.deleteCar);

// Public get list cars
// app.get("/api/cars", carsHandler.getCars);

// Super Admin
// app.post("/api/auth/registeradmin", authHandler.)
app.post("/api/auth/login/superadmin");

// Users
app.post("/api/auth/register", authHandler.register);
app.post("/api/auth/login", authHandler.login);

// Check user token
app.get("/api/auth/me", AuthMiddleware.authenticate, authHandler.getLoggedInUser);

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});

// TODO:
// -- Users
// 1. Delete user by id endpoint
// 2. Get user by id endpoint

// -- Categories
// 1. Create category
// 2. Get all categories

// -- Tweets
// 1. Create tweet
//  -> Create tweet_categories
// 2. Get all tweets
//  -> response // opsional
// {
//   "id",
//   "content",
//   "user"
//    ->
//    {
//       "id",
//       "name"
//    }
//   "categories" -> ['category_name']
// }

// TODO: 17 November 2023
// 1. Create swagger docs for api get list users & create user
// 2. Please add 'role' field for each registration
// User data:
// id, role ('admin' | 'user'), name, email, password, profile_picture_url
// 3. Please add middleware for endpoint get list user for checking user role (please makesure he is an 'admin')
