import mongoose, { Schema, Document } from "mongoose";

export interface IAuth extends Document {
  email: string;
  username: string;
  password: string;
  _id?: string
}

export interface IAuthLogin extends Document {
  email: string;
  password: string;
}

const AuthSchema = new Schema({
  email: Schema.Types.String,
  username: Schema.Types.String,
  password: Schema.Types.String
});

export default mongoose.model<IAuth>("Auth", AuthSchema);
