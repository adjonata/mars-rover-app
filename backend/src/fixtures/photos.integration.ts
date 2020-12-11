import { parseISO, differenceInDays } from "date-fns";
import { Request, Response } from "express";
import Photos from "../models/photos.model";
import Manifests from "../models/manifests.model";
import MarsApi from "../services/marsApi.service";

export interface IPhotosQuery {
  minDate: string | Date;
  maxDate: string | Date;
}

export interface IPhotosApiResponse {
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

export default {
  async photosSync(req: Request, res: Response) {
    let { minDate, maxDate }: IPhotosQuery = req.body;
    const logSync = (message: any) => console.log("Photos Sync -", message);

    if (!minDate || !maxDate) {
      return res.status(400).json({ message: "Invalid period." });
    }

    console.log("==============================");
    logSync(`Checking from ${minDate} to ${maxDate}`);
    console.log("==============================");

    minDate = parseISO(String(minDate));
    maxDate = parseISO(String(maxDate));

    if (differenceInDays(maxDate, minDate) > 365) {
      return res.status(400).json({
        message: "The maximum period is 1 year."
      });
    }

    const manifestsRes = await Manifests.find()
      .where("earth_date")
      .gt(minDate)
      .lt(maxDate)
      .exec();

    if (!manifestsRes || manifestsRes.length === 0) {
      const info = "There are no manifests in that period.";
      logSync(info);
      return res.json({
        message: info
      });
    }

    const solsToSync: number[] = [];

    for (let manifest of manifestsRes) {
      await Photos.countDocuments(
        { earth_date: manifest.earth_date },
        function (err, count) {
          if (err) return;

          if (count !== manifest.total_photos) {
            solsToSync.push(manifest.sol);
          }
        }
      );
    }

    if (solsToSync.length === 0) {
      const info = "All photos from this period have already been synced.";
      logSync(info);
      return res.status(201).json({
        message: info
      });
    }

    let added: Array<number> = [];
    let message: String = "Success in synchronization!";
    let status: number = 200;
    let extras: any = {};
    let missing: number = solsToSync.length;

    for (let sol of solsToSync) {
      const { data } = await MarsApi.get("/rovers/curiosity/photos", {
        params: { sol }
      });

      if (!data || !data.photos || data.photos.length === 0) continue;

      const photos: IPhotosApiResponse[] = data.photos;

      const photosIdsToVerify = photos.map((photo, i) => ({
        id_base: photo.id,
        index: i
      }));

      logSync(`Checking ${photosIdsToVerify.length} photos`);

      const photosFindInDb = await Photos.find()
        .where("id_base")
        .in(photosIdsToVerify.map(p => p.id_base))
        .exec();

      const photosToAdded: Object[] = [];
      const idsAdded: number[] = [];

      for (let photo of photosIdsToVerify) {
        const searchInData = photosFindInDb.findIndex(
          p => p.id_base === photo.id_base
        );

        if (searchInData < 0) {
          // console.log("Photo", photo.id_base, "to be added");
          const content = photos[photo.index];

          const camera = content.camera.name;
          const src: string = content.img_src.split("msl-raw-images/")[1];

          const toCreate = {
            id_base: content.id,
            earth_date: content.earth_date,
            camera,
            src
          };

          photosToAdded.push(toCreate);
          idsAdded.push(content.id);
        }
        continue;
      }

      try {
        const total: number = photosToAdded.length;
        if (total < 1) {
          continue;
        } else {
          logSync(`Adding ${total} photos`);
          await Photos.insertMany(photosToAdded).then(res => {
            added = [...added, ...idsAdded];
            logSync(`${total} photos added`);
          });
        }
      } catch (err) {
        message = "Synchronization error!";
        logSync(message.toUpperCase());
        extras = err;
        status = 500;
      }
      --missing;
      console.log("-----");
      logSync(`Missing ${missing} suns`);
      console.log("-----");
      continue;
    }

    console.log("==============================");
    logSync(`${message}`);
    logSync(`${added.length} photos added`);
    logSync(`Extras: ${JSON.stringify(extras)}`);

    return res.status(status).json({
      message,
      totalAdded: added.length,
      extras
    });
  }
};