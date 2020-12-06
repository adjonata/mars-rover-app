import mongoose, { Schema, Document } from "mongoose";

export interface IPhotos extends Document {
  id_base?: number;
  earth_date: Date | string;
  camera: string;
  src: string;
}

const Photos = new Schema({
  id_base: Schema.Types.Number,
  earth_date: Schema.Types.Date,
  camera: Schema.Types.String,
  src: String,
});

export default mongoose.model<IPhotos>("Manifests", Photos);
