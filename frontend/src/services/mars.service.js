import api from "./api";

export default {
  getAllManifests(name = "curiosity") {
    return new Promise((resolve, reject) => {
      api
        .get(`/manifests/${name}`)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
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
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  },

  getByMartianSol(sol, page = 1, camera = "") {
    return new Promise((resolve, reject) => {
      api
        .get("/rovers/curiosity/photos", {
          params: {
            sol,
            page,
            camera,
          },
        })
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  },

  getLatestPhotos() {
    return new Promise((resolve, reject) => {
      api
        .get("/rovers/curiosity/latest_photos")
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  },
};

Object.prototype.reset = function() {
  for(let key in this) {
    if(typeof this[key] === 'object') {
      this[key].reset();
    }
    else {
      this[key] = null;
    }
  }
}
