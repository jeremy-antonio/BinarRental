import express, { Router } from "express";
import UserHandler from "../handlers/users";
import AuthMiddleWare from "../middlewares/auth";

const UserRouter: Router = express.Router();
const userHandler = new UserHandler();

UserRouter.get("/api/users", AuthMiddleWare.authenticateAdmin, userHandler.getAllUsers);

UserRouter.get("/api/users/:id", AuthMiddleWare.authenticateAdmin, userHandler.getUserById);

UserRouter.post("/api/users", userHandler.createUser);
// AuthMiddleWare.authenticateSuperAdmin
UserRouter.patch("/api/users/:id", AuthMiddleWare.authenticateSuperAdmin, userHandler.updateUserById);

UserRouter.delete("/api/users/:id", AuthMiddleWare.authenticateSuperAdmin, userHandler.deleteUserById);

export default UserRouter;
