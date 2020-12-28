import { Router } from "express";
import { verifyJWT } from "../middlewares/auth";

import PhotosController from "../controllers/photos.controller";
import MarsIntegration from "../fixtures/mars.controller";

const PhotosRoutes = Router();

PhotosRoutes.get("/period", PhotosController.getByPeriod);

PhotosRoutes.post("/sync", verifyJWT, MarsIntegration.sync_photos);

export default PhotosRoutes;
