import {DepartmentRepo} from "../../repositories/DepartmentRepo";
import {postgresDepartmentRepository} from "../../../infrastructure/db/repository/PostgresQL/DepartmentRepoImplement";
import {FilterDepartmentsInfo, FullInfoTableDepartment} from "../../../infrastructure/shared/types/DepartmentTypes";
import {Equipment} from "../../models/Equipment/Equipment";


export class DepartmentService {
    constructor(public departmentRepo: DepartmentRepo) {
    }

    async getAll() {
        return this.departmentRepo.getAll()
    }

    async getById(id: number) {
        return this.departmentRepo.getById(id)
    }

    async getInstituteWithFullInfo(filter: FilterDepartmentsInfo) {
        const info = this.departmentRepo.getAllFullInfo(filter)
        const new_info: FullInfoTableDepartment[] = [];
        (await info)?.forEach((institute: any) => {
            return institute.areas.forEach((area: any) => {
                return area.equipments.forEach((equipment: Equipment) => {
                    new_info.push({
                        id: equipment.id,
                        institute: institute.name,
                        area: area.name,
                        equipment: equipment.name
                    })
                })
            })
        })
        return new_info
    }
}

export const departmentService = new DepartmentService(postgresDepartmentRepository)