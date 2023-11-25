import {ErrorsHandler} from "../Errors/ErrorsController.js";
import {Request, Response} from "express";
import {EquipmentService} from "../../../app/services/EquipmentService/EquipmentService";


export class EquipmentController {
    constructor(public equipmentService: EquipmentService, public errController: ErrorsHandler) {
    }

    async getAllEquipments(req: Request, res: Response) {
        try {
            const data = await this.equipmentService.getAllEquipments()
            res.send({
                msg: "Оборудование получено",
                data
            })
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

    async updateEquipment(req: Request, res: Response) {
        try {
            const data = req.body
            const equipmentUpdated = await this.equipmentService.updateEquipment(data)
            res.send({
                msg: "Информация об оборудовании успешно обновлена",
                data: equipmentUpdated
            })
        } catch (e: any) {
            this.errController.HandlerError(res, e, 400, "Ошибка при обновлении информации об оборудовании")
        }
    }

    async deleteEquipment(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const equipmentDeleted = await this.equipmentService.deleteEquipment(id)
            res.send({
                msg: `Удаление оборудования прошло успешно, удалено: ${equipmentDeleted.name}`
            })
        } catch (e: any) {
            console.log(e)
            this.errController.HandlerError(res, e, 400, "Ошибка при удалении информации")
        }
    }

}
