import {Department} from "../models/Department/Department";
import {FilterDepartmentsInfo} from "../../infrastructure/shared/types/DepartmentTypes";

export interface DepartmentRepo {
    getAll(): Promise<Department[] | null>
    getById(id: number): Promise<Department | null>
    getAllFullInfo(filter: FilterDepartmentsInfo): Promise<any>
}