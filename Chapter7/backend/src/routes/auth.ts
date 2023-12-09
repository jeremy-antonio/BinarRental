import express, { Router } from "express";
import AuthHandler from "../handlers/auth";
import AuthMiddleWare from "../middlewares/auth";

const AuthRouter: Router = express.Router();

const authHandler = new AuthHandler();
AuthRouter.post("/api/login", authHandler.login);
AuthRouter.post("/api/login/google", authHandler.loginGoogle);
AuthRouter.get("/api/current-user", AuthMiddleWare.authenticateAdmin, authHandler.currentUser);

export default AuthRouter;
