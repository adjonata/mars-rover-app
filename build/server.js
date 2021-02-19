"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + '/../.env' });
var app_1 = __importDefault(require("./app"));
var mongoose_1 = __importDefault(require("mongoose"));
var port = 3333;
if (process.env.NODE_ENV === 'production') {
    port = parseInt("" + process.env.PRODUCTION_PORT);
}
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
