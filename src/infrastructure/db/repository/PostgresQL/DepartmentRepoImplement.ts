import {DepartmentRepo} from "../../../../app/repositories/DepartmentRepo";
import {Department} from "../../../../app/models/Department/Department";
import {prisma} from "../../orm/prisma/PrismaClient";


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

    async getAllFullInfo() {
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
            }
        })
    }
}

export const postgresDepartmentRepository = new DepartmentRepoImplement()