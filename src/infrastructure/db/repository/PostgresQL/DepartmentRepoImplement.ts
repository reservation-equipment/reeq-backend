import {DepartmentRepo} from "../../../../app/repositories/DepartmentRepo";
import {Department} from "../../../../app/models/Department/Department";
import {prisma} from "../../orm/prisma/PrismaClient";
import {FilterDepartmentsInfo} from "../../../shared/types/DepartmentTypes";


export class DepartmentRepoImplement implements DepartmentRepo {
    async getById(id: number): Promise<Department | null> {
        return prisma.institutes.findUnique({
            where: {
                id,
            }
        })
    }
    async getAll(): Promise<Department[]> {
        return prisma.institutes.findMany()
    }

    async getAllFullInfo(filter: FilterDepartmentsInfo) {
        const {skip, take} = filter
        return prisma.institutes.findMany({
            select: {
                name: true,
                areas: {
                    select: {
                        name: true,
                        equipments: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            },
            // take,
            // skip
        })
    }
}

export const postgresDepartmentRepository = new DepartmentRepoImplement()