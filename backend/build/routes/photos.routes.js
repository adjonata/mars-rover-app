"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require('express').Router;
var mars_integration_1 = __importDefault(require("../fixtures/mars.integration"));
var PhotosRoutes = Router();
PhotosRoutes.get('/sync', mars_integration_1.default.sync_photos);
exports.default = PhotosRoutes;
