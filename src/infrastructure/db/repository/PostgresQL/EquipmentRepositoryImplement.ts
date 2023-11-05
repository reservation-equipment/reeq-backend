import {EquipmentRepo} from "../../../../app/repositories/EquipmentRepo.js";
import {addProductDto} from "../../../../app/repositories/dto/addEquipmentDto.js";
import {updateEquipmentDto} from "../../../../app/repositories/dto/updateEquipmentDto.js";
import {Equipment} from "../../../../app/models/Equipment/Equipment.js";
import {product} from "../../queries/QueriesEquipment.js";


export class EquipmentRepositoryImplement implements EquipmentRepo {
    getById(id: number): Equipment {

        return {
            count: 0,
            name: "",
            id: 0,
            description:""
        }
    }

    getByFieldName(fieldName: string): Equipment {
        return {
            count: 0,
            name: "",
            id: 0,
            description:""
        }
    }

    getAll(): Equipment[] {
        return [
            {
                count: 0,
                name: "",
                id: 0,
                description:""
            }
        ]
    }

    async add(equipment: addProductDto): Promise<string> {
        return await product.add<addProductDto>(equipment)
    }

    delete(id: number): string {
        return ""
    }

    update(equipment: updateEquipmentDto): Equipment {

        return {
            count: 0,
            name: "",
            id: 0,
            description:""
        }
    }

}

export const postgresEquipmentRepository = new EquipmentRepositoryImplement()