import axios from 'axios'

const marsPhotos = axios.create({
  baseURL: `https://api.nasa.gov/mars-photos/api/v1`,
  timeout: 5000
})

export {
  marsPhotos
}