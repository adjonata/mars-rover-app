import api from "./api";

export default {
  getAllManifests(name = "curiosity") {
    return new Promise((resolve, reject) => {
      api
        .get(`/manifests/${name}`)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getByEarthDay(date, page = 1, camera = "all") {
    return new Promise((resolve, reject) => {
      api
        .get("/rovers/curiosity/photos", {
          params: {
            date,
            page,
            camera,
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
