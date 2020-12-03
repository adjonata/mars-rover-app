const { Router } = require('express');

const ManifestsRoutes = Router();

const ManifestsController = require('../controllers/manifests.controller');

const MarsIntegration = require('../fixtures/mars.integration');

ManifestsRoutes.get('/', ManifestsController.index);
ManifestsRoutes.get('/date/:date', ManifestsController.find);
ManifestsRoutes.post('/', ManifestsController.create);


ManifestsRoutes.get('/sync', MarsIntegration.sync_manifests);



module.exports = ManifestsRoutes;