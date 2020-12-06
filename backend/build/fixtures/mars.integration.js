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
var marsApi_service_1 = __importDefault(require("../services/marsApi.service"));
var manifests_model_1 = __importDefault(require("../models/manifests.model"));
var photos_model_1 = __importDefault(require("../models/photos.model"));
var date_fns_1 = require("date-fns");
exports.default = {
    sync_manifests: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var miliseconds, daysAdded, counter;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        miliseconds = 0;
                        daysAdded = [];
                        counter = setInterval(function () {
                            miliseconds++;
                        }, 100);
                        return [4 /*yield*/, marsApi_service_1.default.get("/manifests/curiosity")
                                .then(function (resAPI) { return __awaiter(_this, void 0, void 0, function () {
                                var photos, allManifests, solsList, _loop_1, _i, photos_1, manifest, responseObject;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            photos = resAPI.data.photo_manifest.photos;
                                            if (!photos)
                                                return [2 /*return*/, res.status(400).json({
                                                        message: "No photos in response.",
                                                    })];
                                            return [4 /*yield*/, manifests_model_1.default.find()];
                                        case 1:
                                            allManifests = _a.sent();
                                            solsList = allManifests.map(function (m) { return m.sol; });
                                            _loop_1 = function (manifest) {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            if (!solsList.includes(manifest.sol)) return [3 /*break*/, 1];
                                                            return [2 /*return*/, "continue"];
                                                        case 1: return [4 /*yield*/, manifests_model_1.default.create(manifest)
                                                                .then(function (resMan) {
                                                                console.log("Synchronization: Day " + resMan.earth_date + " added.");
                                                                daysAdded.push(resMan.earth_date);
                                                            })
                                                                .catch(function (errorMan) {
                                                                var message = "Synchronization error in sol " + manifest.sol + "!";
                                                                console.log(message);
                                                                return res.status(500).json({
                                                                    message: message,
                                                                    details: errorMan,
                                                                });
                                                            })];
                                                        case 2:
                                                            _a.sent();
                                                            _a.label = 3;
                                                        case 3: return [2 /*return*/];
                                                    }
                                                });
                                            };
                                            _i = 0, photos_1 = photos;
                                            _a.label = 2;
                                        case 2:
                                            if (!(_i < photos_1.length)) return [3 /*break*/, 5];
                                            manifest = photos_1[_i];
                                            return [5 /*yield**/, _loop_1(manifest)];
                                        case 3:
                                            _a.sent();
                                            _a.label = 4;
                                        case 4:
                                            _i++;
                                            return [3 /*break*/, 2];
                                        case 5:
                                            clearInterval(counter);
                                            responseObject = {
                                                timing: miliseconds / 10 + " seconds",
                                                totalAdded: daysAdded.length,
                                                daysAdded: daysAdded,
                                            };
                                            return [2 /*return*/, res.json(responseObject)];
                                    }
                                });
                            }); })
                                .catch(function (errorAPI) { return res.json(errorAPI); })
                                .finally(function () { return clearInterval(counter); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    sync_photos: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, minDate, maxDate, totalPhotos, photosAdded, miliseconds, counter;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, minDate = _a.minDate, maxDate = _a.maxDate;
                        if (!minDate || !maxDate) {
                            return [2 /*return*/, res.status(400).json({ message: "Invalid period." })];
                        }
                        minDate = date_fns_1.parseISO(String(minDate));
                        maxDate = date_fns_1.parseISO(String(maxDate));
                        if (date_fns_1.differenceInDays(maxDate, minDate) > 365) {
                            return [2 /*return*/, res.status(400).json({
                                    message: "The maximum period is 1 year.",
                                })];
                        }
                        totalPhotos = 0;
                        photosAdded = [];
                        miliseconds = 0;
                        counter = setInterval(function () {
                            miliseconds++;
                        }, 100);
                        return [4 /*yield*/, manifests_model_1.default.find()
                                .where("earth_date")
                                .gt(minDate)
                                .lt(maxDate)
                                .then(function (resMan) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, new Promise(function (resolve, reject) {
                                            resMan.map(function (man) { return __awaiter(_this, void 0, void 0, function () {
                                                var _this = this;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, marsApi_service_1.default.get("/rovers/curiosity/photos", {
                                                                params: {
                                                                    sol: man.sol,
                                                                },
                                                            })
                                                                .then(function (_a) {
                                                                var data = _a.data;
                                                                return __awaiter(_this, void 0, void 0, function () {
                                                                    var photos, _loop_2, _i, photos_2, photo;
                                                                    var _this = this;
                                                                    return __generator(this, function (_b) {
                                                                        switch (_b.label) {
                                                                            case 0:
                                                                                photos = data.photos;
                                                                                if (!photos || photos.length < 1) {
                                                                                    return [2 /*return*/, reject(res.status(400).json({
                                                                                            message: "There are no photos in this period.",
                                                                                        }))];
                                                                                }
                                                                                _loop_2 = function (photo) {
                                                                                    return __generator(this, function (_a) {
                                                                                        switch (_a.label) {
                                                                                            case 0: return [4 /*yield*/, photos_model_1.default.findOne({ id_base: photo.id })
                                                                                                    .then(function (resPhotos) { return __awaiter(_this, void 0, void 0, function () {
                                                                                                    var camera, src, toCreate;
                                                                                                    return __generator(this, function (_a) {
                                                                                                        switch (_a.label) {
                                                                                                            case 0:
                                                                                                                if (!!resPhotos) return [3 /*break*/, 2];
                                                                                                                camera = photo.camera.name;
                                                                                                                src = photo.img_src.split("msl-raw-images/")[1];
                                                                                                                toCreate = {
                                                                                                                    id_base: photo.id,
                                                                                                                    earth_date: photo.earth_date,
                                                                                                                    camera: camera,
                                                                                                                    src: src,
                                                                                                                };
                                                                                                                return [4 /*yield*/, photos_model_1.default.create(toCreate)
                                                                                                                        .then(function () {
                                                                                                                        totalPhotos++;
                                                                                                                        photosAdded.push(photo.id);
                                                                                                                    })
                                                                                                                        .catch(function (errorCreate) {
                                                                                                                        var messageSyc = "Error in creating imageId " + photo.id + ".";
                                                                                                                        console.log(messageSyc);
                                                                                                                        return reject(res.status(500).json({
                                                                                                                            messageSyc: messageSyc,
                                                                                                                            errorCreate: errorCreate,
                                                                                                                        }));
                                                                                                                    })];
                                                                                                            case 1:
                                                                                                                _a.sent();
                                                                                                                return [3 /*break*/, 3];
                                                                                                            case 2: return [2 /*return*/];
                                                                                                            case 3: return [2 /*return*/];
                                                                                                        }
                                                                                                    });
                                                                                                }); })
                                                                                                    .catch(function (errorPhotos) {
                                                                                                    console.log(errorPhotos);
                                                                                                    return reject(res.status(500).json(errorPhotos));
                                                                                                })];
                                                                                            case 1:
                                                                                                _a.sent();
                                                                                                return [2 /*return*/];
                                                                                        }
                                                                                    });
                                                                                };
                                                                                _i = 0, photos_2 = photos;
                                                                                _b.label = 1;
                                                                            case 1:
                                                                                if (!(_i < photos_2.length)) return [3 /*break*/, 4];
                                                                                photo = photos_2[_i];
                                                                                return [5 /*yield**/, _loop_2(photo)];
                                                                            case 2:
                                                                                _b.sent();
                                                                                _b.label = 3;
                                                                            case 3:
                                                                                _i++;
                                                                                return [3 /*break*/, 1];
                                                                            case 4: return [2 /*return*/];
                                                                        }
                                                                    });
                                                                });
                                                            })
                                                                .catch(function (errorMars) {
                                                                var message = "Synchronization error: get sol " + man.sol + ".";
                                                                console.log(message);
                                                                return reject(res.status(500).json({
                                                                    message: message,
                                                                    errorMars: errorMars,
                                                                }));
                                                            })
                                                                .finally(function () {
                                                                clearInterval(counter);
                                                                var success = {
                                                                    timing: miliseconds / 10 + " seconds",
                                                                    totalPhotos: totalPhotos,
                                                                    photosAdded: photosAdded,
                                                                };
                                                                return resolve(res.status(200).json(success));
                                                            })];
                                                        case 1:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                        })];
                                });
                            }); })
                                .catch(function (errorMan) { return res.status(500).json(errorMan); })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
};
