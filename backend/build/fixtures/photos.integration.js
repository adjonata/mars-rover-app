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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var date_fns_1 = require("date-fns");
var photos_model_1 = __importDefault(require("../models/photos.model"));
var manifests_model_1 = __importDefault(require("../models/manifests.model"));
var marsApi_service_1 = __importDefault(require("../services/marsApi.service"));
exports.default = {
    photosSync: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, minDate, maxDate, logSync, manifestsRes, info, solsToSync, _loop_1, _i, manifestsRes_1, manifest, info, added, message, status, extras, missing, _loop_2, _b, solsToSync_1, sol;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, minDate = _a.minDate, maxDate = _a.maxDate;
                        logSync = function (message) { return console.log("Photos Sync -", message); };
                        if (!minDate || !maxDate) {
                            return [2 /*return*/, res.status(400).json({ message: "Invalid period." })];
                        }
                        console.log("==============================");
                        logSync("Checking from " + minDate + " to " + maxDate);
                        console.log("==============================");
                        minDate = date_fns_1.parseISO(String(minDate));
                        maxDate = date_fns_1.parseISO(String(maxDate));
                        if (date_fns_1.differenceInDays(maxDate, minDate) > 365) {
                            return [2 /*return*/, res.status(400).json({
                                    message: "The maximum period is 1 year."
                                })];
                        }
                        return [4 /*yield*/, manifests_model_1.default.find()
                                .where("earth_date")
                                .gt(minDate)
                                .lt(maxDate)
                                .exec()];
                    case 1:
                        manifestsRes = _c.sent();
                        if (!manifestsRes || manifestsRes.length === 0) {
                            info = "There are no manifests in that period.";
                            logSync(info);
                            return [2 /*return*/, res.json({
                                    message: info
                                })];
                        }
                        solsToSync = [];
                        _loop_1 = function (manifest) {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, photos_model_1.default.countDocuments({ earth_date: manifest.earth_date }, function (err, count) {
                                            if (err)
                                                return;
                                            if (count !== manifest.total_photos) {
                                                solsToSync.push(manifest.sol);
                                            }
                                        })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _i = 0, manifestsRes_1 = manifestsRes;
                        _c.label = 2;
                    case 2:
                        if (!(_i < manifestsRes_1.length)) return [3 /*break*/, 5];
                        manifest = manifestsRes_1[_i];
                        return [5 /*yield**/, _loop_1(manifest)];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        if (solsToSync.length === 0) {
                            info = "All photos from this period have already been synced.";
                            logSync(info);
                            return [2 /*return*/, res.status(201).json({
                                    message: info
                                })];
                        }
                        added = [];
                        message = "Success in synchronization!";
                        status = 200;
                        extras = {};
                        missing = solsToSync.length;
                        _loop_2 = function (sol) {
                            var data, photos, photosIdsToVerify, photosFindInDb, photosToAdded, idsAdded, _loop_3, _i, photosIdsToVerify_1, photo, total_1, err_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, marsApi_service_1.default.get("/rovers/curiosity/photos", {
                                            params: { sol: sol }
                                        })];
                                    case 1:
                                        data = (_a.sent()).data;
                                        if (!data || !data.photos || data.photos.length === 0)
                                            return [2 /*return*/, "continue"];
                                        photos = data.photos;
                                        photosIdsToVerify = photos.map(function (photo, i) { return ({
                                            id_base: photo.id,
                                            index: i
                                        }); });
                                        logSync("Checking " + photosIdsToVerify.length + " photos");
                                        return [4 /*yield*/, photos_model_1.default.find()
                                                .where("id_base")
                                                .in(photosIdsToVerify.map(function (p) { return p.id_base; }))
                                                .exec()];
                                    case 2:
                                        photosFindInDb = _a.sent();
                                        photosToAdded = [];
                                        idsAdded = [];
                                        _loop_3 = function (photo) {
                                            var searchInData = photosFindInDb.findIndex(function (p) { return p.id_base === photo.id_base; });
                                            if (searchInData < 0) {
                                                // console.log("Photo", photo.id_base, "to be added");
                                                var content = photos[photo.index];
                                                var camera = content.camera.name;
                                                var src = content.img_src.split("msl-raw-images/")[1];
                                                var toCreate = {
                                                    id_base: content.id,
                                                    earth_date: content.earth_date,
                                                    camera: camera,
                                                    src: src
                                                };
                                                photosToAdded.push(toCreate);
                                                idsAdded.push(content.id);
                                            }
                                            return "continue";
                                        };
                                        for (_i = 0, photosIdsToVerify_1 = photosIdsToVerify; _i < photosIdsToVerify_1.length; _i++) {
                                            photo = photosIdsToVerify_1[_i];
                                            _loop_3(photo);
                                        }
                                        _a.label = 3;
                                    case 3:
                                        _a.trys.push([3, 7, , 8]);
                                        total_1 = photosToAdded.length;
                                        if (!(total_1 < 1)) return [3 /*break*/, 4];
                                        return [2 /*return*/, "continue"];
                                    case 4:
                                        logSync("Adding " + total_1 + " photos");
                                        return [4 /*yield*/, photos_model_1.default.insertMany(photosToAdded).then(function (res) {
                                                added = __spreadArrays(added, idsAdded);
                                                logSync(total_1 + " photos added");
                                            })];
                                    case 5:
                                        _a.sent();
                                        _a.label = 6;
                                    case 6: return [3 /*break*/, 8];
                                    case 7:
                                        err_1 = _a.sent();
                                        message = "Synchronization error!";
                                        logSync(message.toUpperCase());
                                        extras = err_1;
                                        status = 500;
                                        return [3 /*break*/, 8];
                                    case 8:
                                        --missing;
                                        console.log("-----");
                                        logSync("Missing " + missing + " suns");
                                        console.log("-----");
                                        return [2 /*return*/, "continue"];
                                }
                            });
                        };
                        _b = 0, solsToSync_1 = solsToSync;
                        _c.label = 6;
                    case 6:
                        if (!(_b < solsToSync_1.length)) return [3 /*break*/, 9];
                        sol = solsToSync_1[_b];
                        return [5 /*yield**/, _loop_2(sol)];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8:
                        _b++;
                        return [3 /*break*/, 6];
                    case 9:
                        console.log("==============================");
                        logSync("" + message);
                        logSync(added.length + " photos added");
                        logSync("Extras: " + JSON.stringify(extras));
                        return [2 /*return*/, res.status(status).json({
                                message: message,
                                totalAdded: added.length,
                                extras: extras
                            })];
                }
            });
        });
    }
};
