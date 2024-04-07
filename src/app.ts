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
import {Server} from "socket.io";
import * as http from "node:http";

dotenv.config();
const app = express();
const router = express.Router();
const server = new http.Server(app)

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

const port = process.env.PORT;

// Websocket init

const io = new Server(server)
io.on('connection', (socket) => {
    console.log('a user connected');
});


app.get('/api', (req, res) => {
    res.send('Express + TypeScript Server');
});


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}/api`);
});