import { Router } from "express";

import { verifyJWT } from "@/middlewares/auth";

const ManifestsRoutes = Router();

import ManifestsController from "@/controllers/manifests/manifests.controller";
import MarsIntegration from "@/fixtures/mars.controller";
import validation from "@/validation/manifests.valid";

ManifestsRoutes.get("/", ManifestsController.getAllManifests);
ManifestsRoutes.get(
  "/date/:date",
  validation.findOneManifest,
  ManifestsController.findByEarthDate
);
ManifestsRoutes.get(
  "/sol/:sol",
  validation.findOneManifest,
  ManifestsController.findBySol
);
ManifestsRoutes.get(
  "/cams",
  validation.findByCams,
  ManifestsController.findByCams
);

ManifestsRoutes.post("/sync", verifyJWT, MarsIntegration.sync_manifests);

export default ManifestsRoutes;
