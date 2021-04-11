import mongoose, { Schema, Document } from "mongoose";
import PhotosManifest from "@/types/PhotosManifest";

export interface IManifest extends PhotosManifest, Document {}

const ManifestsModel = new Schema({
  sol: Schema.Types.Number,
  earth_date: Schema.Types.Date,
  total_photos: Schema.Types.Number,
  cameras: [String]
});

export default mongoose.model<IManifest>("Manifests", ManifestsModel);
