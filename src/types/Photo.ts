import Cameras from "./Cameras";

type Photo = {
  sol: number;
  earth_date: string;
  total_photos: number;
  cameras: Cameras[];
};

export default Photo;
