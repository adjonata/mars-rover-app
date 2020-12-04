import axios from "axios";

const mars = axios.create({
  baseURL: "https://api.nasa.gov/mars-photos/api/v1",
  timeout: 30000,
  params: {
    api_key: "9JzCItqyddRdjUAwltjVyL5YwQF5D2Y6WW8Xc9dP"
  }
});

export default {
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      mars
        .get(url, {
          params
        })
        .then(r => {
          resolve(r.data);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
};
