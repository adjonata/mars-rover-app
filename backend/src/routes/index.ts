import { Router } from "express";

import ManifestsRoutes from "./manifests.routes";

const router = Router();

router.use("/manifests", ManifestsRoutes);

export default router;
