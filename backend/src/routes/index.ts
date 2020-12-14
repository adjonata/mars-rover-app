import { Router } from "express";

import ManifestsRoutes from "./manifests.routes";
import PhotosRoutes from "./photos.routes";
import AuthRoutes from "./auth.routes";

const router = Router();

router.use("/manifests", ManifestsRoutes);
router.use("/photos", PhotosRoutes);
router.use("/auth", AuthRoutes);

export default router;
