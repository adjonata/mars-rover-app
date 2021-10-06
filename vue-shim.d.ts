import Vue from 'vue'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { ManifestsPlugin } from '@/plugins/manifests'
import { PhotosPlugin } from './plugins/photos'

declare module '*.vue' {
  export default Vue
}

interface MarsContext {
  $axios: NuxtAxiosInstance
  $manifests: ManifestsPlugin
  $photos: PhotosPlugin
}

declare module '@nuxt/types' {
  interface Context extends MarsContext {}
  interface NuxtAppOptions extends MarsContext {}
}

declare module 'vue/types/vue' {
  interface Vue extends MarsContext {}
}
