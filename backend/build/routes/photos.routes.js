"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require('express').Router;
var photos_controller_1 = __importDefault(require("../controllers/photos.controller"));
var mars_integration_1 = __importDefault(require("../fixtures/mars.integration"));
var PhotosRoutes = Router();
PhotosRoutes.get('/period', photos_controller_1.default.getByPeriod);
PhotosRoutes.post('/sync', mars_integration_1.default.sync_photos);
exports.default = PhotosRoutes;
