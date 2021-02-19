"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var manifests_model_1 = __importDefault(require("../models/manifests.model"));
exports.default = {
    getAllManifests: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, manifests_model_1.default.find()
                            .then(function (resAPI) {
                            return res.status(200).json(resAPI);
                        })
                            .catch(function (errorAPI) {
                            return res.status(500).json(errorAPI);
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    findByCams: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var cameras;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cameras = req.body.cameras;
                        if (!cameras || cameras.length < 1) {
                            return [2 /*return*/, res.status(400).json({
                                    message: "No cameras chosen",
                                })];
                        }
                        return [4 /*yield*/, manifests_model_1.default.find({ cameras: { $all: cameras } })
                                .then(function (resMan) { return res.status(200).json(resMan); })
                                .catch(function (errorMan) { return res.status(400).json({ errorMan: errorMan }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    findOneManifest: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var earth_date, sol, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        earth_date = req.params.date;
                        sol = parseInt(req.params.sol);
                        if (!earth_date && !sol) {
                            return [2 /*return*/, res.status(401).json({
                                    message: "Invalid query!",
                                })];
                        }
                        query = {};
                        if (sol)
                            query["sol"] = sol;
                        if (earth_date)
                            query["earth_date"] = earth_date;
                        return [4 /*yield*/, manifests_model_1.default.findOne(query)
                                .then(function (resAPI) {
                                if (!resAPI) {
                                    return res.status(400).json({ message: "Has no images that day :(" });
                                }
                                var limitPerPage = 424;
                                var total_pages = 1;
                                if (resAPI.total_photos) {
                                    total_pages = Math.ceil(resAPI.total_photos / limitPerPage);
                                }
                                var cameras = resAPI.cameras, sol = resAPI.sol, total_photos = resAPI.total_photos, earth_date = resAPI.earth_date;
                                return res.json({
                                    sol: sol,
                                    earth_date: earth_date,
                                    cameras: cameras,
                                    total_photos: total_photos,
                                    total_pages: total_pages,
                                });
                            })
                                .catch(function (error) { return res.json(error); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
};
