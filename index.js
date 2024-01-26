import bodyParser from "body-parser";
import express from "express";
import { set, connect } from "mongoose";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import path from "path";
import routes from "./routes/routes.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { configDotenv } from "dotenv";
const app = express();
configDotenv();

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", routes);
set("strictQuery", false);
connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to MongoDb");
  server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
  });
});
