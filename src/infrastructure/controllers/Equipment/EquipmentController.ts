import {EquipmentService} from "../../../app/services/EquipmentService/EquipmentService.js";
import {ErrorsHandler} from "../Errors/ErrorsController.js";
import {Request, Response} from "express";


export class EquipmentController {
    constructor(public equipmentService: EquipmentService, public errController: ErrorsHandler) {
    }

    async getAllEquipments(req: Request, res: Response) {

        try {
            res.send("lox")
        } catch (e: any) {
            this?.errController?.HandlerError(res, e, 400, "продукты не получены")
        }

    }

    async addNewEquipmentController(req: Request, res: Response) {
        try {
            const fields = req.body;
            const newEquipment = await this.equipmentService.addNewEquipment(fields)
            res.send(newEquipment)
        } catch (e: any) {
            this?.errController?.HandlerError(res, e, 400, "ошибка при добавлении продукта")
            console.log(e)
        }
    }

    async getEquipmentById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const equipment = await this.equipmentService.getEquipmentById(id)
            res.send(equipment)
        } catch (e: any) {
            this.errController.HandlerError(res, e, 400, "Ошибка при получении оборудования по id")
        }
    }
}
