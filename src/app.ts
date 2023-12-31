import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import cookieParser from "cookie-parser"
import {equipmentRoutes} from "./infrastructure/routes/rest/EquipmentsRoutes";
import {areaRoutes} from "./infrastructure/routes/rest/AreaRoutes";
import {departmentsRoutes} from "./infrastructure/routes/rest/DepartmentsRoutes";
import {userRoutes} from "./infrastructure/routes/rest/UserRoutes";
import {ErrorMiddleware} from "./infrastructure/middlewares/ErrorMiddleware";
import * as process from "process";
import {bookingRoutes} from "./infrastructure/routes/rest/BookingRoutes";
import {uploadRoutes} from "./infrastructure/routes/rest/UploadRoutes";
import {UploadMiddleware} from "./infrastructure/middlewares/UploadMiddleware";
import bodyParser from "body-parser";
import multer from "multer";

dotenv.config();
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(multer().any());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
// app.use(express.static(`/uploads`))
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}))


equipmentRoutes.initRoutes(app);
areaRoutes.initRoutes(app)
departmentsRoutes.initRoutes(app)
userRoutes.initRoutes(app)
bookingRoutes.initRoutes(app)
uploadRoutes.initRoutes(app)

app.post(`/uploads`, UploadMiddleware())

app.use(ErrorMiddleware)

const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});