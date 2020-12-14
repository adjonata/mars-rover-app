"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthRoutes = express_1.Router();
var auth_1 = require("../middlewares/auth");
var auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
AuthRoutes.post("/register", auth_1.noLogged, auth_controller_1.default.register);
AuthRoutes.post("/login", auth_1.noLogged, auth_controller_1.default.login);
AuthRoutes.get("/logout", auth_controller_1.default.logout);
exports.default = AuthRoutes;
