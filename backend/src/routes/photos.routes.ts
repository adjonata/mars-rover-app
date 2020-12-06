const { Router } = require('express');
import MarsIntegration from "../fixtures/mars.integration";

const PhotosRoutes = Router();

PhotosRoutes.get('/sync', MarsIntegration.sync_photos);

export default PhotosRoutes;