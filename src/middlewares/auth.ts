import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface IAllowed extends Request {
  user?: Object;
}

export function verifyJWT(req: IAllowed, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({ message: "No token provided." });

  jwt.verify(String(token), String(process.env.SECRET), (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: "Failed to authenticate token." });
    }

    if (decoded) {
      req.user = decoded;
    }
    next();
  });
}

export function noLogged(req: IAllowed, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  if (!token) return next();

  jwt.verify(String(token), String(process.env.SECRET), (err, decoded) => {
    if (err) {
      return next();
    }

    return res.status(200).json({
      message: "Already logged in."
    });
  });
}
