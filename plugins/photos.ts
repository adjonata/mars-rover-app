import { Plugin } from '@nuxt/types'
import { Photo } from '@/types'

export type PhotosPlugin = {
  getByPeriod(minDate: string, maxDate: string): Photo[]
}

const photos: Plugin = ({ $axios }, inject) => {
  inject('photos', {
    // Get photos by period in API
    async getByPeriod(minDate: string, maxDate: string, cameras: string[]) {
      const body: {
        minDate: string
        maxDate: string
        cameras?: string[]
      } = {
        minDate,
        maxDate,
      }

      if (cameras) body.cameras = cameras

      return await $axios
        .post<Photo[]>('/photos/period', body)
        .then((response) => {
          return response.data
        })
    },
  })
}

export default photos
