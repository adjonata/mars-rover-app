import { Router } from "express";

import ManifestsRoutes from "./manifests.routes";
import PhotosRoutes from "./photos.routes";

const router = Router();

router.use("/manifests", ManifestsRoutes);
router.use("/photos", PhotosRoutes);

export default router;
