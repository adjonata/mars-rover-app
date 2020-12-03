const Manifests = require("../models/manifests.model");

module.exports = {
  async index(req, res) {
    const manifests = await Manifests.find();

    return res.json(manifests);
  },
  async find(req, res) {
    const { date: earth_date } = req.params;

    const manifest = await Manifests.findOne({ earth_date });

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
