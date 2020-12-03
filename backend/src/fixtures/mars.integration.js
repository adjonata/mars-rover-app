const MarsApi = require("../services/marsApi.service");
const ManifestsModel = require("../models/manifests.model");

module.exports = {
  async sync_manifests(req, res) {
    let seconds = 0;
    let totalAdded = 0;

    const counter = setInterval(() => {
      seconds++;
    }, 1000);

    return await MarsApi.get("/manifests/curiosity")
      .then(async resAPI => {
        const { data } = resAPI;

        const allManifests = await ManifestsModel.find();

        const fillManisfets = allManifests.map(m => m.sol);

        for (let manifest of data.photo_manifest.photos) {
          if (fillManisfets.includes(manifest.sol)) {
            continue;
          } else {
            await ManifestsModel.create(manifest).then(() => {
              console.log(`Synchronization: Sun ${manifest.sol} added.`);
              totalAdded++;
            });
          }
        }

        clearInterval(counter);

        return res.json({ synchronizationTime: `${seconds} seconds`, totalAdded });
      })
      .catch(errorAPI => res.json(errorAPI));
  }
};
