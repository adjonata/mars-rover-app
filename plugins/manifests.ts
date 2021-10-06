import { Plugin } from '@nuxt/types'
import { PhotosManifest } from '@/types'

export type ManifestsPlugin = {
  sync(): void
  get(): PhotosManifest[]
}

const manifests: Plugin = ({ $axios, store }, inject) => {
  inject('manifests', {
    /**
     * Sync all photos manifests
     */
    async sync() {
      const isLoaded = store.getters['manifests/isLoaded']

      if (!isLoaded) {
        await $axios
          .get<PhotosManifest[]>('/manifests')
          .then(async (response) => {
            const manifests = response.data || []

            await store.dispatch('manifests/setManifests', manifests)
            await store.dispatch('manifests/setLoadStatus', true)
          })
      }
    },
    /**
     * Get all photos manifests of store
     */
    get() {
      return store.getters['manifests/manifests']
    },
  })
}

export default manifests
