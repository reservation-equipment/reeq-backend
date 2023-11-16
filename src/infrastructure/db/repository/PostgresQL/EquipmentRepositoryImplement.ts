import {EquipmentRepo} from "../../../../app/repositories/EquipmentRepo.js";
import {addProductDto} from "../../../../app/repositories/dto/addEquipmentDto.js";
import {updateEquipmentDto} from "../../../../app/repositories/dto/updateEquipmentDto.js";
import {Equipment} from "../../../../app/models/Equipment/Equipment.js";
import {prisma} from "../../orm/prisma/PrismaClient.js";


const defaultReturnObj = {
    count: 0,
    name: "",
    id: 0,
    description: "",
    area_id: 0
}

export class EquipmentRepositoryImplement implements EquipmentRepo {
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

    getAll(): Equipment[] {
        return [
            defaultReturnObj
        ]
    }

    async add(equipment: addProductDto): Promise<Equipment> {
        return prisma.equipments.create({
            data: {
                ...equipment
            }
        });
    }

    delete(id: number): string {
        return ""
    }

    update(equipment: updateEquipmentDto): Equipment {

        return defaultReturnObj
    }

}

export const postgresEquipmentRepository = new EquipmentRepositoryImplement()