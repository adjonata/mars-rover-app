import { Router } from "express";

import { verifyJWT } from "../middlewares/auth";

const ManifestsRoutes = Router();

import ManifestsController from "../controllers/manifests.controller";
import MarsIntegration from "../fixtures/mars.controller";

ManifestsRoutes.get("/", ManifestsController.getAllManifests);
ManifestsRoutes.get("/date/:date", ManifestsController.findOneManifest);
ManifestsRoutes.get("/sol/:sol", ManifestsController.findOneManifest);
ManifestsRoutes.get("/cams", ManifestsController.findByCams);

ManifestsRoutes.post("/sync", verifyJWT, MarsIntegration.sync_manifests);

export default ManifestsRoutes;
