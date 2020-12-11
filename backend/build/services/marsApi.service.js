"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var api = axios_1.default.create({
    baseURL: "https://api.nasa.gov/mars-photos/api/v1",
    params: {
        api_key: "9JzCItqyddRdjUAwltjVyL5YwQF5D2Y6WW8Xc9dP",
    },
    timeout: 150000,
});
exports.default = api;
