import { Request, Response } from "express";
import Timer, { ITimer } from "@/utils/timer";
import ManifestsModel from "@/models/manifests.model";
import ManifestsService from "@/services/manifests.service";

import PhotosManifest from "@/types/PhotosManifest";

interface IManifestsSync {
  totalAdded: number;
  daysAdded: string[];
  timer: ITimer | undefined;
}

export default class ManifestsSync implements IManifestsSync {
  totalAdded = 0;
  daysAdded: string[] = [];
  timer: ITimer | undefined = undefined;

  constructor(request: Request, response: Response) {
    this.timer = new Timer();
    this.syncAllManifests(response);
  }

  async syncAllManifests(response: Response) {
    try {
      const manifestsAtTheBase = await this.getManifestsAtTheBase();
      const listOfSavedSols = await this.fetchTheListOfSavedSols();

      for (let photoManifest of manifestsAtTheBase) {
        if (listOfSavedSols.includes(photoManifest.sol)) continue;
        else {
          try {
            await this.saveManifest(photoManifest);
            this.registerManifestAdded(photoManifest.earth_date);
          } catch (error) {
            return response.status(500);
          }
        }
      }

      this.timer?.break();

      const successfullResponse = this.createSuccessfulResponse();

      return response.status(200).json(successfullResponse);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  createSuccessfulResponse() {
    return {
      message: "Synchronization success",
      syncSeconds: this.timer?.getSeconds() || 1,
      syncMilliSeconds: this.timer?.getMilliSeconds() || 1,
      totalAdded: this.totalAdded,
      daysAdded: this.daysAdded
    };
  }

  registerManifestAdded(earth_date: string) {
    this.daysAdded.push(earth_date);
    this.totalAdded++;
    console.log("Manifests added:", earth_date);
  }

  async saveManifest(manifest: PhotosManifest) {
    return await ManifestsModel.create(manifest);
  }

  async fetchTheListOfSavedSols(): Promise<number[]> {
    const listOfSavedSols = await this.getTheSavedManifests();
    return listOfSavedSols.map(saved => saved.sol);
  }

  async getManifestsAtTheBase() {
    return await ManifestsService.getCuriosityManifests()
      .then(manifests => manifests.photo_manifest.photos)
      .catch(error => error);
  }

  async getTheSavedManifests() {
    const savedManifests = await ManifestsModel.find();
    return savedManifests || [];
  }
}
