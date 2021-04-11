import PhotosManifest from "./PhotosManifest";

export default interface Manifest {
  photo_manifest: {
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
    max_sol: number;
    max_date: string;
    total_photos: number;
    photos: PhotosManifest[];
  };
}
