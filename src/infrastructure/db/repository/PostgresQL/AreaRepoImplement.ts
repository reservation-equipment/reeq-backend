import {AreaRepo} from "../../../../app/repositories/AreaRepo.js";
import {prisma} from "../../orm/prisma/PrismaClient.js";
import {addAreaDto} from "../../../../app/repositories/dto/addAreaDto.js";
import {Area} from "../../../../app/models/Area/Area.js";

export class AreaRepoImplement implements AreaRepo {
    async add(area: addAreaDto): Promise<Area> {
        return prisma.areas.create({
            data: {
                ...area
            }
        })
    }

    async getAll(): Promise<Area[]> {
        return prisma.areas.findMany();
    }

    async getAllWithInstitutes(){
        return prisma.areas.findMany({
            include: {
                institutes: {
                    select: {
                        name: true
                    }
                }
            },
        });
    }


    async getById(id: number): Promise<Area | null> {
        return prisma.areas.findUnique({
            where: {
                id
            }
        });
    }

    async getByFieldName(fieldName: string): Promise<Area | null> {
        return prisma.areas.findFirst({
            where: {
                name: fieldName
            }
        })
    }

    async delete(id: number): Promise<Area> {
        return prisma.areas.delete({
            where: {
                id
            },
        })
    }

    async update(area: Area): Promise<Area> {
        const {id, ...fields} = area;

        return prisma.areas.update({
            data: {
                ...fields
            }, where: {
                id
            }
        })
    }
}

export const postgresAreaRepository = new AreaRepoImplement()