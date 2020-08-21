import { marsPhotos } from '../../http/api.js'

const BUSCAR_FOTOS = (dia, sol) => {
  return new Promise((resolve, reject) => {
    marsPhotos.get(`rovers/curiosity/photos`, {
      params: {
        sol: sol,
        earth_date: `${dia}`,
        api_key: '9JzCItqyddRdjUAwltjVyL5YwQF5D2Y6WW8Xc9dP'
      }
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
        console.log(err)
      })
  })
}

export {
  BUSCAR_FOTOS
}
