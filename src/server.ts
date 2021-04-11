import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env" });

import app from "./app";
import mongoose, { CallbackError } from "mongoose";

let port: number = 8080;

if (process.env.NODE_ENV === "production") {
  port = parseInt(`${process.env.PRODUCTION_PORT}`);
}

mongoose.set("useCreateIndex", true);

mongoose
  .connect(process.env.CONNECTION!, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Application running on port ${port}`);
    });
  })
  .catch((error: CallbackError) => {
    console.log(error);
  });
