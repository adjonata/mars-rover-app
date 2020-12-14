import express from "express";
import cors from "cors";
import router from "./routes";
import morgan from "morgan";
import winston from "./config/winston";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(morgan('combined', { stream: winston.stream }));


export default app;
