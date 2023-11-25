import {Express} from "express";
import {AreaController} from "../../controllers/Area/AreaController";
import {areaService} from "../../../app/services/AreaService/AreaService";
import {errorsHandler} from "../../controllers/Errors/ErrorsController";
import {Routes} from "./Routes";



const areaController = new AreaController(areaService, errorsHandler)

class AreaRoutes implements Routes{
    constructor(readonly areaController: AreaController, public initRoutePath: string) {
    }
    initRoutes(router: Express) {
        router.post(`${this.initRoutePath}`, this.areaController.createArea.bind(this.areaController))
        router.get(`${this.initRoutePath}s`, this.areaController.getAllAreas.bind(this.areaController))
        router.delete(`${this.initRoutePath}/:id`, this.areaController.deleteArea.bind(this.areaController))
        router.get(`${this.initRoutePath}/:id`, this.areaController.getAreaById.bind(this.areaController))
    }
}

export const areaRoutes = new AreaRoutes(areaController, "/area")