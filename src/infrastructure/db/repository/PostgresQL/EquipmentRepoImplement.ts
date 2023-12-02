import {EquipmentRepo} from "../../../../app/repositories/EquipmentRepo.js";
import {addProductDto} from "../../../../app/repositories/dto/addEquipmentDto.js";
import {Equipment} from "../../../../app/models/Equipment/Equipment.js";
import {prisma} from "../../orm/prisma/PrismaClient.js";


const defaultReturnObj = {
    count: 0,
    name: "",
    id: 0,
    description: "",
    area_id: 0
}

export class EquipmentRepoImplement implements EquipmentRepo {
    async getById(id: number): Promise<Equipment | null> {
        return prisma.equipments.findUnique({
            where: {
                id
            }
        });
    }

    getByFieldName(fieldName: string): Equipment {
        return defaultReturnObj
    }

    async getAll(): Promise<Equipment[]> {
        return prisma.equipments.findMany();
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

    async update(equipment: Equipment): Promise<Equipment> {

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