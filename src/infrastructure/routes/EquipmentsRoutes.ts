import {Express} from 'express';
import {EquipmentController} from "../controllers/Equipment/EquipmentController.js";
import {equipmentService} from "../../app/services/EquipmentService/EquipmentService.js";
import {errorsHandler} from "../controllers/Errors/ErrorsController.js";

export const equipmentsController = new EquipmentController(equipmentService, errorsHandler)

class EquipmentsRoutes {
    constructor(readonly equipmentsController: EquipmentController) {}

    initRoutes(router: Express) {
        router.get("/equipments", this.equipmentsController.getAllEquipments.bind(this.equipmentsController))
        router.post("/equipment", this.equipmentsController.addNewEquipmentController.bind(this.equipmentsController))
        router.get("/equipment/:id", this.equipmentsController.getEquipmentById.bind(this.equipmentsController))
    }
}

export const equipmentRoutes = new EquipmentsRoutes(equipmentsController)