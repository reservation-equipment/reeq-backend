import {Request, Response} from "express";
import {ErrorsHandler} from "../Errors/ErrorsController";
import {DepartmentService} from "../../../app/services/DepartmentService/DepartmentService";


export class DepartmentController {
    constructor( private departmentService: DepartmentService, private  errController: ErrorsHandler) {
    }

    async getInstituteById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const department = await this.departmentService.getById(id)
            res.send({
                msg: "Институт получен!",
                data: department
            })
        } catch (e: any) {

        }
    }

    async getAllInstitutes(req: Request, res: Response) {
        try {
            const departments = await this.departmentService.getAll()
            res.send({
                msg: "Институты успешно получены!",
                data: departments
            })
        } catch (e: any) {
            this.errController.HandlerError(res, e,  400, "Ошибка при получении институтов!")
        }
    }

    async getInstituteWithFullInfo(req: Request, res: Response) {
        try {
            const info = await this.departmentService.getInstituteWithFullInfo()
            res.send({
                msg: "success",
                data: info
            })
        } catch (e: any) {
            this.errController.HandlerError(res, e,  400, "Ошибка при получении полной информации в таблицу структурных подразделений!")

        }
    }
}