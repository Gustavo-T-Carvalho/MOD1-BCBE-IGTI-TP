import express from "express";
import { promises as fs } from "fs"
import carsRouter from "./cars/cars.js";
global.fileName = "car-list.json";

const { readFile, writeFile } = fs;
const app = express();
app.use(express.json());
app.use("/cars", carsRouter);


app.listen(3000, async () => {
    try {
        await readFile(global.fileName);
        console.log("Cars UP");
    } catch (error) {
        console.log(error)
    }

});