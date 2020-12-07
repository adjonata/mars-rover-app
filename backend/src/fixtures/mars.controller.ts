import ManifestsIntegration from "./manifests.integration";
import PhotosIntegration from "./photos.integration";
import { Request, Response } from "express";

export default {
  async sync_manifests(req: Request, res: Response) {
    return await ManifestsIntegration.manifestSync(req, res);
  },

  async sync_photos(req: Request, res: Response) {
    return await PhotosIntegration.photosSync(req, res);
  }
};
