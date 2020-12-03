const { Router } = require('express');

const router = Router();

const ManifestsRoutes = require('./manifests.routes');

router.use('/manifests', ManifestsRoutes);

module.exports = router;