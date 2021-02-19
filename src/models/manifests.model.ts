import mongoose, { Schema, Document } from "mongoose";

export interface IManifest extends Document {
  sol: number,
  earth_date: Date | string,
  total_photos: number,
  cameras: string[],
}

const Manifests = new Schema({
  sol: Schema.Types.Number,
  earth_date: Schema.Types.Date,
  total_photos: Schema.Types.Number,
  cameras: [String]
});

export default mongoose.model<IManifest>("Manifests", Manifests);
