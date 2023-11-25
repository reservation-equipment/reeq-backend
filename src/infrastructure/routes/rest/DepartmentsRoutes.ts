import {Express} from 'express';
import {DepartmentController} from "../../controllers/Department/DepartmentController";
import {departmentService} from "../../../app/services/DepartmentService/DepartmentService";
import {errorsHandler} from "../../controllers/Errors/ErrorsController";
import {Routes} from "./Routes";


export const departmentsController = new DepartmentController(departmentService, errorsHandler)

class DepartmentsRoutes implements Routes {
    constructor(private departmentsController: DepartmentController, private initRoutePath: string) {}

    initRoutes(router: Express) {
        router.get(`${this.initRoutePath}s`, this.departmentsController.getAllInstitutes.bind(this.departmentsController))
        router.get(`${this.initRoutePath}/info`, this.departmentsController.getInstituteWithFullInfo.bind(this.departmentsController))
        router.get(`${this.initRoutePath}/:id`, this.departmentsController.getInstituteById.bind(this.departmentsController))
    }
}

export const departmentsRoutes = new DepartmentsRoutes(departmentsController, "/department")