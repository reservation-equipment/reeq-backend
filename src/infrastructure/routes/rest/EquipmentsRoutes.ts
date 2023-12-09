import {Express} from 'express';
import {EquipmentController, equipmentsController} from "../../controllers/Equipment/EquipmentController";
import {equipmentService} from "../../../app/services/EquipmentService/EquipmentService";
import {Routes} from "./Routes";
import {AuthMiddleware} from "../../middlewares/AuthMiddleware";



class EquipmentsRoutes implements Routes{
    constructor(readonly equipmentsController: EquipmentController, public initRoutePath: string) {}

    initRoutes(router: Express) {
        router.get(`${this.initRoutePath}s`, this.equipmentsController.getAllEquipments.bind(this.equipmentsController))
        router.post(`${this.initRoutePath}`, this.equipmentsController.addNewEquipmentController.bind(this.equipmentsController))
        router.get(`${this.initRoutePath}/:id`, this.equipmentsController.getEquipmentById.bind(this.equipmentsController))
        router.patch(`${this.initRoutePath}`, this.equipmentsController.updateEquipment.bind(this.equipmentsController))
        router.delete(`${this.initRoutePath}/:id`, this.equipmentsController.deleteEquipment.bind(this.equipmentsController))
    }
}

export const equipmentRoutes = new EquipmentsRoutes(equipmentsController, "/equipment")