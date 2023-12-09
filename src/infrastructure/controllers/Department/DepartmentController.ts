import {NextFunction, Request, Response} from "express";
import {departmentService, DepartmentService} from "../../../app/services/DepartmentService/DepartmentService";


export class DepartmentController {
    constructor( private departmentService: DepartmentService) {
    }

    async getInstituteById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const department = await this.departmentService.getById(id)
            res.send({
                msg: "Институт получен!",
                data: department
            })
        } catch (e: any) {
            next(e)

        }
    }

    async getAllInstitutes(req: Request, res: Response, next: NextFunction) {
        try {
            const departments = await this.departmentService.getAll()
            res.send({
                msg: "Институты успешно получены!",
                data: departments
            })
        } catch (e: any) {
            next(e)
        }
    }

    async getInstituteWithFullInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const info = await this.departmentService.getInstituteWithFullInfo()
            res.send({
                msg: "success",
                data: info
            })
        } catch (e: any) {
            next(e)
        }
    }
}

export const departmentsController = new DepartmentController(departmentService)
