import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import router from "./route";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors())

app.use("/api/v2", router);

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));