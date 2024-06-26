import {Express, Router} from "express";
import {areaController, AreaController} from "../../controllers/Area/AreaController";
import {Routes} from "./Routes";


class AreaRoutes implements Routes{
    constructor(readonly areaController: AreaController, public initRoutePath: string) {
    }
    initRoutes(router: Router) {
        router.post(`${this.initRoutePath}`, this.areaController.createArea.bind(this.areaController))
        router.get(`${this.initRoutePath}s`, this.areaController.getAllAreas.bind(this.areaController))
        router.delete(`${this.initRoutePath}/:id`, this.areaController.deleteArea.bind(this.areaController))
        router.get(`${this.initRoutePath}/:id`, this.areaController.getAreaById.bind(this.areaController))
        router.patch(`${this.initRoutePath}`, this.areaController.updateArea.bind(this.areaController))
    }
}

export const areaRoutes = new AreaRoutes(areaController, "/area")