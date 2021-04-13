import express from "express";
import cors from "cors";
import router from "./routes";
import { errors } from "celebrate";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errors());

export default app;
