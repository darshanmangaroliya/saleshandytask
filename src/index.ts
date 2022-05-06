import "reflect-metadata";
import express from "express";
import "dotenv/config";
import cors from "cors";

import { createConnection } from "typeorm";
import { User } from "./app/models/User";
import { Vaccinations } from "./app/models/Vaccination ";
import vaccinationRouter from "./Routes/vaccination.Route"
import { errorHandler } from "./Middleware/errorHandler";
const app = express();

const main = async () => {
  try {
    await createConnection({
     
      type: "mysql",
      host: process.env.DATABASE_URL,
      port: 3306,
      username: "root",
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [User,Vaccinations],
      synchronize: false,
    });
    console.log("Connected to mysql");

    app.use(express.json());
    app.use(cors());

    //route

    app.get("/", (req, res) => {
      res.send("come from server");
    });
    app.use("/api",vaccinationRouter)
    app.use(errorHandler)

    app.listen(8080, () => {
      console.log("Now running on port 8080");
    });
  } catch (error) {
    console.error("error:", error);
    throw new Error("Unable to connect to db");
  }
};

main();
