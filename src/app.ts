import express from 'express';
import dotenv from 'dotenv';
import {equipmentRoutes} from "./infrastructure/routes/EquipmentsRoutes.js";

dotenv.config();


const app = express();
app.use(express.json())
const port = process.env.PORT;


app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});

equipmentRoutes.initRoutes(app);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});