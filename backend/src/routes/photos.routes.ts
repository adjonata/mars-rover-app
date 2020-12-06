const { Router } = require('express');
import PhotosController from "../controllers/photos.controller";
import MarsIntegration from "../fixtures/mars.integration";

const PhotosRoutes = Router();

PhotosRoutes.get('/period', PhotosController.getByPeriod);

PhotosRoutes.post('/sync', MarsIntegration.sync_photos);

export default PhotosRoutes;