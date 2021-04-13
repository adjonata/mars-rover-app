import Manifests from "@/models/manifests.model";
import PhotosManifest from "@/types/PhotosManifest";
import { Request, Response } from "express";
import { CallbackError } from "mongoose";

export default {
  async getAllRoverManifests(req: Request, res: Response) {
    return await Manifests.find()
      .then(resAPI => {
        return res.status(200).json(resAPI);
      })
      .catch((errorAPI: CallbackError) => {
        return res.status(500).json(errorAPI);
      });
  },

  async findByCams(req: Request, res: Response) {
    const { cameras } = req.body;

    if (!cameras || cameras.length < 1) {
      return res.status(400).json({
        message: "No cameras chosen"
      });
    }

    return await Manifests.find({ cameras: { $all: cameras } })
      .then(resMan => res.status(200).json(resMan))
      .catch(errorMan => res.status(400).json({ errorMan }));
  },

  async findOneManifest(req: Request, res: Response) {
    const earth_date: string = req.params.date;
    const sol: number = parseInt(req.params.sol);

    if (!earth_date && !sol) {
      return res.status(401).json({
        message: "Invalid query!"
      });
    }

    const query: {
      sol?: number;
      earth_date?: string;
    } = {};

    if (sol) query["sol"] = sol;
    if (earth_date) query["earth_date"] = earth_date;

    return await Manifests.findOne(query)
      .then(resAPI => {
        if (!resAPI) {
          return res.status(400).json({ message: "Has no images that day :(" });
        }

        const limitPerPage: number = 424;
        let total_pages: number = 1;

        if (resAPI.total_photos) {
          total_pages = Math.ceil(resAPI.total_photos / limitPerPage);
        }

        const {
          cameras,
          sol,
          total_photos,
          earth_date
        }: PhotosManifest = resAPI;

        return res.json({
          sol,
          earth_date,
          cameras,
          total_photos,
          total_pages
        });
      })
      .catch((error: CallbackError) => res.json(error));
  }
};
