"use strict";
var _a = require("mongoose"), Schema = _a.Schema, model = _a.model;
var Manifests = new Schema({
    sol: Schema.Types.Number,
    earth_date: Schema.Types.Date,
    total_photos: Schema.Types.Number,
    cameras: [String]
});
module.exports = model("Manifests", Manifests);
