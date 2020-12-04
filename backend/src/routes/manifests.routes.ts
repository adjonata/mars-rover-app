const { Router } = require('express');

const ManifestsRoutes = Router();

import ManifestsController from "../controllers/manifests.controller";

import MarsIntegration from "../fixtures/mars.integration";

ManifestsRoutes.get('/', ManifestsController.index);
ManifestsRoutes.get('/date/:date', ManifestsController.find);
ManifestsRoutes.post('/', ManifestsController.create);


ManifestsRoutes.get('/sync', MarsIntegration.sync_manifests);

export default ManifestsRoutes;