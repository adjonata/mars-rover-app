import Manifests from "@/models/manifests.model";
import PhotosManifest from "@/types/PhotosManifest";
import { Request, Response, RequestParamHandler } from "express";
import { CallbackError } from "mongoose";

interface IFindByCamsRequest extends Request {
  body: {
    cameras?: string[];
  };
}

interface IFindBySolParams {
  sol?: string;
}

interface IFindByEarthDateParams {
  date?: string;
}

export default {
  async getAllManifests(req: Request, res: Response) {
    return await Manifests.find()
      .then(resAPI => {
        return res.status(200).json(resAPI);
      })
      .catch((errorAPI: CallbackError) => {
        return res.status(500).json(errorAPI);
      });
  },

  async findByCams(req: IFindByCamsRequest, res: Response) {
    const { cameras } = req.body;

    if (!cameras || cameras.length < 1) {
      return res.status(400).json({
        message: "No cameras chosen"
      });
    }

    const manifests = await Manifests.find({
      cameras: { $all: cameras }
    });

    return res.status(200).json(manifests);
  },

  async findBySol(req: Request<IFindBySolParams>, res: Response) {
    const { sol } = req.params;

    if (!sol) {
      return res.status(401).json({
        message: "Invalid query!"
      });
    }

    const manifests = await Manifests.find({ sol: parseInt(sol) });

    return res.status(200).json(manifests);
  },

  async findByEarthDate(req: Request<IFindByEarthDateParams>, res: Response) {
    const { date } = req.params;

    if (!date) {
      return res.status(401).json({
        message: "Invalid query!"
      });
    }

    const manifests = await Manifests.find({ earth_date: date });

    return res.status(200).json(manifests);
  }
};
