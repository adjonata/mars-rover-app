import Manifests from "../models/manifests.model";
import { Request, Response } from "express";
import { CallbackError } from "mongoose";

export default {
  async index(req: Request, res: Response) {
    const manifests = await Manifests.find();

    return res.json(manifests);
  },
  async find(req: Request, res: Response) {
    const { date: earth_date } = req.params;

    return await Manifests.findOne({ earth_date })
      .then(resAPI => {
        if (!resAPI) return res.status(400).json({ message: 'Has no images that day :('});

        const limit: number = 424;
        let total_pages: number = 0;

        if (resAPI.total_photos) {
          total_pages = Math.ceil(resAPI.total_photos / limit);
        }

        const { cameras, sol, total_photos } = resAPI;

        return res.json({
          sol,
          cameras,
          total_photos,
          total_pages
        });
      })
      .catch((error: CallbackError) => res.json(error));
  },

  async create(req: Request, res: Response) {
    const { sol, earth_date, total_photos, cameras } = req.body;

    return await Manifests.create({
      sol,
      earth_date,
      total_photos,
      cameras
    })
      .then(resDB => res.json(resDB))
      .catch((errorDB: CallbackError) => res.json(errorDB));
  }
};
