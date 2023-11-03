import express from 'express';
import dotenv from 'dotenv';
import {equipmentRoutes} from "./infrastructure/routes/EquipmentsRoutes.ts";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});

equipmentRoutes.initRoutes(app);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});