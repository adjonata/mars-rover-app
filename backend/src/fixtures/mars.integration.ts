import MarsApi from "../services/marsApi.service";
import ManifestsModel, { IManifest } from "../models/manifests.model";
import { Request, Response } from "express";

export default {
  async sync_manifests(req: Request, res: Response) {
    let miliseconds: number = 0;
    let daysAdded: Array<Date | string> = [];

    const counter = setInterval(() => {
      miliseconds++;
    }, 100);

    return await MarsApi.get("/manifests/curiosity")
      .then(async resAPI => {
        const { data } = resAPI;

        const allManifests = await ManifestsModel.find();

        const fillManisfets: number[] = allManifests.map(m => m.sol);

        const photos: Array<IManifest> = data.photo_manifest.photos;

        for (let manifest of photos) {
          if (fillManisfets.includes(manifest.sol)) {
            continue;
          } else {
            await ManifestsModel.create(manifest).then(resMan => {
              console.log(`Synchronization: Day ${resMan.earth_date} added.`);
              daysAdded.push(resMan.earth_date);
            });
          }
        }

        clearInterval(counter);

        return res.json({
          synchronizationTime: `${miliseconds / 10} ms`,
          totalAdded: daysAdded.length,
          daysAdded
        });
      })
      .catch(errorAPI => res.json(errorAPI));
  }
};
