import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import {equipmentRoutes} from "./infrastructure/routes/rest/EquipmentsRoutes";
import {areaRoutes} from "./infrastructure/routes/rest/AreaRoutes";
import {departmentsRoutes} from "./infrastructure/routes/rest/DepartmentsRoutes";


dotenv.config();

const app = express();
app.use(express.json())
app.use(cors())
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});

equipmentRoutes.initRoutes(app);
areaRoutes.initRoutes(app)
departmentsRoutes.initRoutes(app)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});