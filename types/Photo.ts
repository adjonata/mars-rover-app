import { Rover } from './Rover'
import { CameraDetails } from './RoversCameras'

export interface Photo {
  id: number
  sol: number
  camera: CameraDetails
  src: string
  earth_date: string
  rover: Rover
}

export type PhotoRaw = {
  photos: Photo[]
}
