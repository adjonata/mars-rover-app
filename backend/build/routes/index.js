"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var manifests_routes_1 = __importDefault(require("./manifests.routes"));
var photos_routes_1 = __importDefault(require("./photos.routes"));
var auth_routes_1 = __importDefault(require("./auth.routes"));
var router = express_1.Router();
router.use("/manifests", manifests_routes_1.default);
router.use("/photos", photos_routes_1.default);
router.use("/auth", auth_routes_1.default);
exports.default = router;
