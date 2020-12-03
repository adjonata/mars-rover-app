const Manifests = require("../models/manifests.model");

module.exports = {
  async index(req, res) {
    const manifests = await Manifests.find();

    return res.json(manifests);
  },
  async find(req, res) {
    const { date: earth_date } = req.params;

    return await Manifests.findOne({ earth_date })
      .then(resAPI => {
        const limit = process.env.QUERY_DATE_LIMIT;

        const total_pages = Math.ceil(resAPI.total_photos / limit);

        const { cameras, sol, total_photos } = resAPI;
        
        return res.json({
          sol,
          cameras,
          total_photos,
          total_pages
        });
      })
      .catch(errorAPI => res.json(errorAPI));
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
