import MarsApi from "./marsApi.service";
import Photo, { PhotoRaw } from "@/types/Photo";

export default {
  queryBySol(sol: number): Promise<Photo[]> {
    return MarsApi.get<PhotoRaw>(`/rovers/${process.env.ROVER}/photos`, {
      params: {
        sol
      }
    }).then(response => response.data.photos);
  },
  queryByEarthDate(earth_date: string): Promise<Photo[]> {
    return MarsApi.get<PhotoRaw>(`/rovers/${process.env.ROVER}/photos`, {
      params: {
        earth_date
      }
    }).then(response => response.data.photos);
  }
};
