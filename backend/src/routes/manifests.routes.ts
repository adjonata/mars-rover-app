import { Router } from "express";

import { verifyJWT } from "../middlewares/auth";

const ManifestsRoutes = Router();

import ManifestsController from "../controllers/manifests.controller";
import MarsIntegration from "../fixtures/mars.controller";
import validation from "../validation/manifests.valid";

ManifestsRoutes.get("/", ManifestsController.getAllManifests);
ManifestsRoutes.get(
  "/date/:date",
  validation.findOneManifest,
  ManifestsController.findOneManifest
);
ManifestsRoutes.get(
  "/sol/:sol",
  validation.findOneManifest,
  ManifestsController.findOneManifest
);
ManifestsRoutes.get(
  "/cams",
  validation.findByCams,
  ManifestsController.findByCams
);

ManifestsRoutes.post("/sync", verifyJWT, MarsIntegration.sync_manifests);

export default ManifestsRoutes;
