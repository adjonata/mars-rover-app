import MarsApi from "../services/marsApi.service";
import Manifests, { IManifest } from "../models/manifests.model";
import { Request, Response } from "express";
import { CallbackError } from "mongoose";

export interface ISyncManifests {
  timing: string;
  totalAdded: number;
  daysAdded?: Array<Date | string>;
}

export interface ISyncPhotos {
  minDate: string | Date;
  maxDate: string | Date;
}

export default {
  async sync_manifests(req: Request, res: Response) {
    let miliseconds: number = 0;
    let daysAdded: Array<Date | string> = [];

    const counter = setInterval(() => {
      miliseconds++;
    }, 100);

    return await MarsApi.get("/manifests/curiosity")
      .then(async (resAPI) => {
        const photos: Array<IManifest> = resAPI.data.photo_manifest.photos;

        if (!photos)
          return res.status(400).json({
            message: "No photos in response.",
          });

        const allManifests = await Manifests.find();

        const solsList: number[] = allManifests.map((m) => m.sol);

        for (let manifest of photos) {
          if (solsList.includes(manifest.sol)) {
            continue;
          } else {
            await Manifests.create(manifest)
              .then((resMan) => {
                console.log(`Synchronization: Day ${resMan.earth_date} added.`);
                daysAdded.push(resMan.earth_date);
              })
              .catch((errorMan: CallbackError) => {
                const message = `Synchronization error in sol ${manifest.sol}!`;
                console.log(message);

                return res.status(500).json({
                  message,
                  details: errorMan,
                });
              });
          }
        }

        clearInterval(counter);

        const responseObject: ISyncManifests = {
          timing: `${miliseconds / 10} seconds`,
          totalAdded: daysAdded.length,
          daysAdded,
        };

        return res.json(responseObject);
      })
      .catch((errorAPI) => res.json(errorAPI))
      .finally(() => clearInterval(counter));
  },

  async sync_photos(req: Request, res: Response) {
    let minDate: string = "";
    let maxDate: string = "";

    if ("minDate" in req.params) minDate = String(req.params.minDate);
    if ("maxDate" in req.params) maxDate = String(req.params.maxDate);

    let photosAdded: number = 0;
    let miliseconds: number = 0;

    const counter = setInterval(() => {
      miliseconds++;
    }, 100);

    return await Manifests.find();
  },
};
