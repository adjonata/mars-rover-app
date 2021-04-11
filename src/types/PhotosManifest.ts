import { CuriosityCameras } from "./RoversCameras";

export default interface PhotoManifest {
  sol: number;
  earth_date: string;
  total_photos: number;
  cameras: CuriosityCameras[];
}
