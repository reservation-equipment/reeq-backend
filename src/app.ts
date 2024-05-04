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
import bodyParser from "body-parser";
import multer from "multer";
import * as http from "node:http";
import {NotificationsService} from "./app/services/Notifications/NotificationsService";
import {postgresBookingRepository} from "./infrastructure/db/repository/PostgresQL/BookingRepoImplement";
import {postgresUserRepository} from "./infrastructure/db/repository/PostgresQL/UserRepoImplement";


dotenv.config();
const app = express();
const router = express.Router();
const server = http.createServer(app)

app.use(express.json())
app.use(cookieParser())
app.use(multer().any());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}))


equipmentRoutes.initRoutes(router);
areaRoutes.initRoutes(router)
departmentsRoutes.initRoutes(router)
userRoutes.initRoutes(router)
bookingRoutes.initRoutes(router)
uploadRoutes.initRoutes(router)

router.post("/saveTokenApp", async (req, res) => {
    const {token, userId} = req.body;
    await firebase.saveToken(token, userId);
    res.status(200).send("Token saved")
})

app.use("/api", router)

app.use(ErrorMiddleware)

// Firebase
const firebase = new NotificationsService(postgresBookingRepository, postgresUserRepository)


const port = process.env.PORT;

app.get('/api', (req, res) => {
    res.send('Express + TypeScript Server');
});



server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}/api`);
});



