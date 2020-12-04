"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var app_1 = __importDefault(require("./app"));
var mongoose_1 = __importDefault(require("mongoose"));
var port = parseInt("" + process.env.PRODUCTION_PORT || '3333');
mongoose_1.default.set("useCreateIndex", true);
mongoose_1.default
    .connect(process.env.CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(function () {
    app_1.default.listen(port, function () {
        console.log("Application running on port " + port);
    });
})
    .catch(function (error) {
    console.log(error);
});
