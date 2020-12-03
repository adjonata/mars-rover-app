const { Schema, model } = require("mongoose");

const Manifests = new Schema({
  sol: Schema.Types.Number,
  earth_date: Schema.Types.Date,
  total_photos: Schema.Types.Number,
  cameras: [String]
});

module.exports = model("Manifests", Manifests);
