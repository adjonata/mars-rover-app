"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../middlewares/auth");
var photos_controller_1 = __importDefault(require("../controllers/photos.controller"));
var mars_controller_1 = __importDefault(require("../fixtures/mars.controller"));
var PhotosRoutes = express_1.Router();
PhotosRoutes.get("/period", photos_controller_1.default.getByPeriod);
PhotosRoutes.post("/sync", auth_1.verifyJWT, mars_controller_1.default.sync_photos);
exports.default = PhotosRoutes;
