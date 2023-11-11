import express, { Application } from "express";
import uploadCloudUtil from "./utils/uploadCloud";
import CarsHandler from "./handlers/cars";
// import cloudinary from "../config/cloudinary";

const app: Application = express();
const PORT: number = 8081;

app.use(express.json());

// Init handlers
const carsHandler = new CarsHandler();

// Define routes
// Show List Cars
app.get("/api/cars", carsHandler.getCars);
// Create New Car
app.post("/api/cars", uploadCloudUtil.single("car_foto_url"), carsHandler.createCar);
// Update Car Info
app.put("/api/cars/:id", carsHandler.updateCar);
// Delete Car
app.delete("/api/cars/:id", carsHandler.deleteCar);

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
