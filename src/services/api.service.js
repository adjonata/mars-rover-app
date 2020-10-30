import axios from "axios";

const api = axios.create({
  baseURL: "https://api.nasa.gov/mars-photos/api/v1",
  params: {
    api_key: "9JzCItqyddRdjUAwltjVyL5YwQF5D2Y6WW8Xc9dP",
  },
});

export default api;
