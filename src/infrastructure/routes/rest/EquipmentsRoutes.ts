import {Express, Router} from 'express';
import {EquipmentController, equipmentsController} from "../../controllers/Equipment/EquipmentController";
import {Routes} from "./Routes";


class EquipmentsRoutes implements Routes {
    constructor(private equipmentsController: EquipmentController, public initRoutePath: string) {
    }

    initRoutes(router: Router) {
        router.get(`${this.initRoutePath}s`, this.equipmentsController.getAllEquipments.bind(this.equipmentsController))
        router.post(`${this.initRoutePath}`, this.equipmentsController.addNewEquipmentController.bind(this.equipmentsController))
        router.get(`${this.initRoutePath}/:id`, this.equipmentsController.getEquipmentById.bind(this.equipmentsController))
        router.patch(`${this.initRoutePath}`, this.equipmentsController.updateEquipment.bind(this.equipmentsController))
        router.delete(`${this.initRoutePath}/:id`, this.equipmentsController.deleteEquipment.bind(this.equipmentsController))
        router.get(`${this.initRoutePath}/users_equipment/:equipment_id`, this.equipmentsController.getUsersEquipment.bind(this.equipmentsController))
    }
}

export const equipmentRoutes = new EquipmentsRoutes(equipmentsController, "/equipment")