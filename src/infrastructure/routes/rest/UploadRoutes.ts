import {Express, Router} from 'express';
import {Routes} from "./Routes";
import {uploadsController, UploadsController} from "../../controllers/Upload/UploadsController";
import {UploadMiddleware} from "../../middlewares/UploadMiddleware";


class UploadRoutes implements Routes {
    constructor(readonly uploadsController: UploadsController, public initRoutePath: string) {
    }

    initRoutes(router: Router) {
        router.post(`${this.initRoutePath}/uploads`, UploadMiddleware())
    }
}

export const uploadRoutes = new UploadRoutes(uploadsController, "")