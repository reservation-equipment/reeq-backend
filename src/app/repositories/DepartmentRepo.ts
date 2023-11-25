import {Department} from "../models/Department/Department";

export interface DepartmentRepo {
    getAll(): Promise<Department[] | null>
    getById(id: number): Promise<Department | null>
    getAllFullInfo(): Promise<any>
}