import MarsApi from "../services/marsApi.service";
import Manifests, { IManifest } from "../models/manifests.model";
import Photos, { IPhotos } from "../models/photos.model";
import { Request, Response } from "express";
import { CallbackError } from "mongoose";
import { parseISO, differenceInDays, max, min } from "date-fns";

export interface ISyncManifests {
  timing: string;
  totalAdded: number;
  daysAdded?: Array<Date | string>;
}

export interface IPhotosQuery {
  minDate: string | Date;
  maxDate: string | Date;
}

export interface IPhotosResponse {
  id: number;
  sol: number;
  camera: {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
  };
  img_src: string;
  earth_date: string;
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
  };
}
export interface IPhotosSuccess {
  timing: string;
  totalPhotos: number;
  photosIds: number[];
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
    let { minDate, maxDate }: IPhotosQuery = req.body;

    if (!minDate || !maxDate) {
      return res.status(400).json({ message: "Invalid period." });
    }

    minDate = parseISO(String(minDate));
    maxDate = parseISO(String(maxDate));

    if (differenceInDays(maxDate, minDate) > 365) {
      return res.status(400).json({
        message: "The maximum period is 1 year.",
      });
    }

    let totalPhotos: number = 0;
    const photosIds: number[] = [];
    let miliseconds: number = 0;

    const counter = setInterval(() => {
      miliseconds++;
    }, 100);

    return await Manifests.find()
      .where("earth_date")
      .gt(minDate)
      .lt(maxDate)
      .then(async (resMan) => {
        return await new Promise(async (resolve, reject) => {
          return await resMan.map(async (man) => {
            await MarsApi.get("/rovers/curiosity/photos", {
              params: {
                sol: man.sol,
              },
            })
              .then(async ({ data }) => {
                const photos: IPhotosResponse[] = data.photos;

                if (!photos || photos.length < 1) {
                  return reject(
                    res.status(400).json({
                      message: "There are no photos in this period.",
                    })
                  );
                }

                const photosToAdded: Array<Object> = [];

                for (let photo of photos) {
                  await Photos.findOne({ id_base: photo.id })
                    .then(async (resPhotos) => {
                      if (!resPhotos) {
                        const camera = photo.camera.name;
                        const src: string = photo.img_src.split(
                          "msl-raw-images/"
                        )[1];

                        const toCreate = {
                          id_base: photo.id,
                          earth_date: photo.earth_date,
                          camera,
                          src,
                        };

                        photosToAdded.push(toCreate);
                        totalPhotos++;
                        photosIds.push(photo.id);
                      } else {
                        return;
                      }
                    })
                    .catch((errorPhotos) => {
                      console.log(errorPhotos);
                      return reject(res.status(500).json(errorPhotos));
                    });
                }
                return await Photos.insertMany(photosToAdded)
                  .then(() => {
                    clearInterval(counter);

                    const success: IPhotosSuccess = {
                      timing: `${miliseconds / 10} seconds`,
                      totalPhotos,
                      photosIds,
                    };

                    return resolve(res.status(200).json(success));
                  })
                  .catch((errorCreate) => {
                    return reject(
                      res.status(500).json({
                        message: "Synchronization error: create multiple",
                        errorCreate,
                      })
                    );
                  });
              })
              .catch((errorMars) => {
                const message = `Synchronization error: get sol ${man.sol}.`;
                console.log(message);

                return reject(
                  res.status(500).json({
                    message,
                    errorMars,
                  })
                );
              });
          });
        });
      })
      .catch((errorMan) => res.status(500).json(errorMan));
  },
};
