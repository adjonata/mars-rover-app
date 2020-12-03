const { create } = require("../models/manifests.model");
const Manifests = require("../models/manifests.model");
const { parseISO } = require("date-fns");

module.exports = {
  async index(req, res) {
    const manifests = await Manifests.find();

    return res.json(manifests);
  },
  async find(req, res) {
    const { date } = req.params;

    const iso = parseISO(date);
    console.log(iso);

    const manifest = await Manifests.findOne({ earth_date: date });

    return res.json(manifest);
  },
  async create(req, res) {
    const { sol, earth_date, total_photos, cameras } = req.body;

    return await Manifests.create({
      sol,
      earth_date,
      total_photos,
      cameras
    })
      .then(resDB => res.json(resDB))
      .catch(errorDB => res.json(errorDB));
  }
};
