import { Router } from "express";

const AuthRoutes = Router();

import { noLogged } from "../middlewares/auth";

import AuthController from "../controllers/auth.controller";

AuthRoutes.post("/register", noLogged, AuthController.register);
AuthRoutes.post("/login", noLogged, AuthController.login);
AuthRoutes.get("/logout", AuthController.logout);

export default AuthRoutes;
