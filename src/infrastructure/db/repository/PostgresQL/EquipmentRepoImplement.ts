import {EquipmentRepo} from "../../../../app/repositories/EquipmentRepo.js";
import {addProductDto} from "../../../../app/repositories/dto/addEquipmentDto.js";
import {Equipment} from "../../../../app/models/Equipment/Equipment.js";
import {prisma} from "../../orm/prisma/PrismaClient.js";
import {updateEquipmentDto} from "../../../../app/repositories/dto/updateEquipmentDto";
import {EquipmentFilter} from "../../../shared/types/Equipment";


const defaultReturnObj: Equipment = {
    count: 0,
    name: "",
    id: 0,
    description: "",
    area_id: 0,
    status: "FREE"
}

export class EquipmentRepoImplement implements EquipmentRepo {
    async getById(id: number): Promise<Equipment | null> {
        return prisma.equipments.findUnique({
            where: {
                id
            }
        });
    }

    async getByFieldName(fieldName: string): Promise<Equipment> {
        return defaultReturnObj
    }

    async getCountRows(filter: EquipmentFilter): Promise<any> {
        return prisma.equipments.aggregate({
            _count: true,
            where: {
                name: {
                    startsWith: filter?.name
                },
            }
        })
    }

    async getAll(filter: EquipmentFilter, skip: string, take: string): Promise<Equipment[]> {
        return prisma.equipments.findMany({
            where: {
                name: {
                    startsWith: filter?.name
                },
                status: filter?.status
            },
            skip: skip ? Number(skip) : undefined,
            take: take ? Number(take) : undefined,
        });
    }

    async add(equipment: addProductDto): Promise<Equipment> {
        return prisma.equipments.create({
            data: {
                ...equipment
            }
        });
    }

    async delete(id: number): Promise<Equipment> {
        return prisma.equipments.delete({
            where: {
                id
            },
        })
    }

    async update(equipment: updateEquipmentDto): Promise<Equipment> {

        const {id, ...fields} = equipment;

        return prisma.equipments.update({
            data: {
                ...fields
            },
            where: {
                id
            }
        })
    }

}

export const postgresEquipmentRepository = new EquipmentRepoImplement()