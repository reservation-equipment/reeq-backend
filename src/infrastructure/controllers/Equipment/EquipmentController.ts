import {EquipmentService} from "../../../app/services/EquipmentService/EquipmentService";
import {ErrorsHandler} from "../Errors/ErrorsController";


export class EquipmentController {
    constructor(readonly equipmentService: EquipmentService, readonly errController: ErrorsHandler) {
    }

    async getAllEquipments(req: any, res: any) {

        try {
            res.send("lox")

        } catch (e: any) {
            this.errController.HandlerError(res, e, 400, "продукты не получены")
        }

    }
}

