import {Express, Router} from 'express';
import {DepartmentController, departmentsController} from "../../controllers/Department/DepartmentController";
import {Routes} from "./Routes";


class DepartmentsRoutes implements Routes {
    constructor(private departmentsController: DepartmentController, private initRoutePath: string) {}

    initRoutes(router: Router) {
        router.get(`${this.initRoutePath}s`, this.departmentsController.getAllInstitutes.bind(this.departmentsController))
        router.get(`${this.initRoutePath}/info`, this.departmentsController.getInstituteWithFullInfo.bind(this.departmentsController))
        router.get(`${this.initRoutePath}/:id`, this.departmentsController.getInstituteById.bind(this.departmentsController))
    }
}

export const departmentsRoutes = new DepartmentsRoutes(departmentsController, "/department")