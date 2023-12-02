import {AreaService} from "../../../app/services/AreaService/AreaService";
import {NextFunction, Request, Response} from "express";

export class AreaController {
    constructor(private areaService: AreaService) {
    }

    async createArea(req: Request, res: Response, next: NextFunction){
        try {
            const data = req.body;
            const createdArea = await this.areaService.createArea(data)
            res.send({
                msg: "Помещение успешно добавлено!",
                data: createdArea
            })
        } catch (e: any) {
            next(e)
        }
    }

    async getAllAreas(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.areaService.getAllAreas()
            res.send({
                msg: "Данные получены",
                data
            })
        } catch (e: any) {
            next(e)

        }
    }

    async deleteArea(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const deletedArea = await this.areaService.deleteArea(id)
            res.send({
                msg: `Удаление помещения прошло успешно, удалено: ${deletedArea.name}`
            })
        } catch (e: any) {
            next(e)
        }
    }

    async getAreaById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const area = await this.areaService.getAreaById(id)
            res.send({
                msg: 'Помещение успешно получено!',
                data: area
            })
        } catch (e: any) {
            next(e)

        }
    }

}