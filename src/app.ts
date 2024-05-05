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
import {Expo} from "expo-server-sdk";
import {CronJob} from "cron";
import {FirebaseService} from "./app/services/Firebase/FirebaseService";
import {postgresEquipmentRepository} from "./infrastructure/db/repository/PostgresQL/EquipmentRepoImplement";


dotenv.config();
const app = express();
const router = express.Router();
const server = http.createServer(app)
const expo = new Expo()

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


app.use("/api", router)

app.use(ErrorMiddleware)

// Firebase
const firebase = new FirebaseService(postgresBookingRepository, postgresUserRepository)
const notificationExpo = new NotificationsService(postgresEquipmentRepository, postgresBookingRepository,
	postgresUserRepository,
	firebase,
	expo)

// new CronJob('*/30 * * * * *', async () => {
//     notificationExpo.sendAlertReservationNotification()
// }).start()

const port = process.env.PORT;

app.get('/api', (req, res) => {
	res.send('Express + TypeScript Server');
});


server.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}/api`);
});



