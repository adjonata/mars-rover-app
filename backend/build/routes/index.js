"use strict";
var Router = require('express').Router;
var router = Router();
var ManifestsRoutes = require('./manifests.routes');
router.use('/manifests', ManifestsRoutes);
module.exports = router;
