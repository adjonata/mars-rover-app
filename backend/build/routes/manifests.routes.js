"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require('express').Router;
var ManifestsRoutes = Router();
var manifests_controller_1 = __importDefault(require("../controllers/manifests.controller"));
var mars_integration_1 = __importDefault(require("../fixtures/mars.integration"));
ManifestsRoutes.get('/', manifests_controller_1.default.index);
ManifestsRoutes.get('/date/:date', manifests_controller_1.default.find);
ManifestsRoutes.post('/', manifests_controller_1.default.create);
ManifestsRoutes.get('/sync', mars_integration_1.default.sync_manifests);
exports.default = ManifestsRoutes;
