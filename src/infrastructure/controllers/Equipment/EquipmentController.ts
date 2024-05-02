import {NextFunction, Request, Response} from "express";
import {equipmentService, EquipmentService} from "../../../app/services/EquipmentService/EquipmentService";
import {EquipmentStatus} from "../../shared/types/Equipment";
import {bookingService, BookingService} from "../../../app/services/BookingService/BookingService";


export class EquipmentController {
    constructor(public equipmentService: EquipmentService, private bookingService: BookingService) {
    }

    async getAllEquipments(req: Request, res: Response, next: NextFunction) {
        try {
            const {name, status, skip, take} = req.query;
            const {data, count} = await this.equipmentService.getAllEquipments({
                name: name as string,
            }, Number(skip), Number(take))

            res.send({
                msg: "Оборудование получено",
                data,
                count
            })
        } catch (e: any) {
            next(e)
        }

    }

    async addNewEquipmentController(req: Request, res: Response, next: NextFunction) {
        try {
            const fields = req.body;
            const newEquipment = await this.equipmentService.addNewEquipment(fields)
            res.send(newEquipment)
        } catch (e: any) {
            next(e)
        }
    }

    async getEquipmentById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const equipment = await this.equipmentService.getEquipmentById(id)
            res.send(equipment)
        } catch (e: any) {
            next(e)
        }
    }

    async updateEquipment(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body
            const equipmentUpdated = await this.equipmentService.updateEquipment(data)
            res.send({
                msg: "Информация об оборудовании успешно обновлена",
                data: equipmentUpdated
            })
        } catch (e: any) {
            next(e)
        }
    }

    async deleteEquipment(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const equipmentDeleted = await this.equipmentService.deleteEquipment(id)
            res.send({
                msg: `Удаление оборудования прошло успешно, удалено: ${equipmentDeleted.name}`
            })
        } catch (e: any) {
            next(e)
        }
    }
    
    async getUsersEquipment(req: Request, res: Response, next: NextFunction) {
        try {
            const equipment_id = Number(req.params.equipment_id)
            const listUsers = await this.bookingService.getListUsersForEquipment(equipment_id)
            res.send({
                msg: `Список юзеров, забронировавших текущее оборудование, получен`,
                data: listUsers
            })
        } catch (e: any) {
            next(e)
        }
    }

}

export const equipmentsController = new EquipmentController(equipmentService, bookingService)
