import {Express} from 'express';
import {EquipmentController} from "../controllers/Equipment/EquipmentController.ts";
import {equipmentService} from "../../app/services/EquipmentService/EquipmentService.ts";
import {errorsHandler} from "../controllers/Errors/ErrorsController.ts";

const equipmentsController = new EquipmentController(equipmentService, errorsHandler)

class EquipmentsRoutes {
    constructor(readonly equipmentsController: EquipmentController) {}

    initRoutes(router: Express) {
        router.get("/equipments", this.equipmentsController.getAllEquipments)

    }
}

export const equipmentRoutes = new EquipmentsRoutes(equipmentsController)