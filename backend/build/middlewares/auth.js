"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noLogged = exports.verifyJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyJWT(req, res, next) {
    var token = req.headers["authorization"];
    if (!token)
        return res.status(401).json({ message: "No token provided." });
    jsonwebtoken_1.default.verify(String(token), String(process.env.SECRET), function (err, decoded) {
        if (err) {
            return res.status(500).json({ message: "Failed to authenticate token." });
        }
        if (decoded) {
            req.user = decoded;
        }
        next();
    });
}
exports.verifyJWT = verifyJWT;
function noLogged(req, res, next) {
    var token = req.headers["authorization"];
    if (!token)
        return next();
    jsonwebtoken_1.default.verify(String(token), String(process.env.SECRET), function (err, decoded) {
        if (err) {
            return res
                .status(500)
                .json({ auth: false, message: "Failed to authenticate token." });
        }
        return res.status(200).json({
            message: "Already logged in."
        });
    });
}
exports.noLogged = noLogged;
