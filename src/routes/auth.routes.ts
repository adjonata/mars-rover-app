import { Router } from "express";

const AuthRoutes = Router();

import { noLogged, registrationEnabled } from "@/middlewares/auth";

import AuthController from "@/controllers/auth/auth.controller";
import validation from "@/validation/auth.valid";

AuthRoutes.post(
  "/register",
  registrationEnabled,
  noLogged,
  validation.register,
  AuthController.register
);
AuthRoutes.post("/login", noLogged, validation.login, AuthController.login);
AuthRoutes.get("/logout", AuthController.logout);

export default AuthRoutes;
