/**
 * CURIOSITY + OPPORTUNITY + SPIRIT
 * ------
 * FHAZ - Front Hazard Avoidance Camera
 * RHAZ - Rear Hazard Avoidance Camera
 * MAST - Mast Camera
 * CHEMCAM - Chemistry and Camera Complex
 * MAHLI - Mars Hand Lens Imager
 * MARDI - Mars Descent Imager
 * NAVCAM - Navigation Camera
 * PANCAM - Panoramic Camera
 * MINITES - Miniature Thermal Emission Spectrometer (Mini-TES)
 */
const enum InitialCameras {
  FHAZ = 'FHAZ',
  RHAZ = 'RHAZ',
  NAVCAM = 'NAVCAM',
  PANCAM = 'PANCAM',
  MINITES = 'MINITES',
}

export type SpiritCameras = InitialCameras
export type OpportunityCameras = InitialCameras

const enum NewCuriosityCameras {
  MAST = 'MAST',
  CHEMCAM = 'CHEMCAM',
  MAHLI = 'MAHLI',
  MARDI = 'MARDI',
}

export type CuriosityCameras = InitialCameras | NewCuriosityCameras

export const enum PerseveranceCameras {
  EDL_RUCAM = 'EDL_RUCAM',
  EDL_RDCAM = 'EDL_RDCAM',
  EDL_DDCAM = 'EDL_DDCAM',
  EDL_PUCAM1 = 'EDL_PUCAM1',
  EDL_PUCAM2 = 'EDL_PUCAM2',
  NAVCAM_LEFT = 'NAVCAM_LEFT',
  NAVCAM_RIGHT = 'NAVCAM_RIGHT',
  MCZ_RIGHT = 'MCZ_RIGHT',
  MCZ_LEFT = 'MCZ_LEFT',
  FRONT_HAZCAM_LEFT_A = 'FRONT_HAZCAM_LEFT_A',
  FRONT_HAZCAM_RIGHT_A = 'FRONT_HAZCAM_RIGHT_A',
  REAR_HAZCAM_LEFT = 'REAR_HAZCAM_LEFT',
  REAR_HAZCAM_RIGHT = 'REAR_HAZCAM_RIGHT',
}

export type CameraDetails = {
  id: number
  name: string
  rover_id: number
  full_name: string
}
