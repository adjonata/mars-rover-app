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
var Manifests = require("../models/manifests.model");
module.exports = {
    index: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var manifests;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Manifests.find()];
                    case 1:
                        manifests = _a.sent();
                        return [2 /*return*/, res.json(manifests)];
                }
            });
        });
    },
    find: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var earth_date;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        earth_date = req.params.date;
                        return [4 /*yield*/, Manifests.findOne({ earth_date: earth_date })
                                .then(function (resAPI) {
                                var limit = process.env.QUERY_DATE_LIMIT;
                                var total_pages = Math.ceil(resAPI.total_photos / limit);
                                var cameras = resAPI.cameras, sol = resAPI.sol, total_photos = resAPI.total_photos;
                                return res.json({
                                    sol: sol,
                                    cameras: cameras,
                                    total_photos: total_photos,
                                    total_pages: total_pages
                                });
                            })
                                .catch(function (errorAPI) { return res.json(errorAPI); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    create: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, sol, earth_date, total_photos, cameras;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, sol = _a.sol, earth_date = _a.earth_date, total_photos = _a.total_photos, cameras = _a.cameras;
                        return [4 /*yield*/, Manifests.create({
                                sol: sol,
                                earth_date: earth_date,
                                total_photos: total_photos,
                                cameras: cameras
                            })
                                .then(function (resDB) { return res.json(resDB); })
                                .catch(function (errorDB) { return res.json(errorDB); })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }
};
