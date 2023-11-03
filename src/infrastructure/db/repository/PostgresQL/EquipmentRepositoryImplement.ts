import {EquipmentRepo} from "../../../../app/repositories/EquipmentRepo";
import {addProductDto} from "../../../../app/repositories/dto/addEquipmentDto";
import {updateEquipmentDto} from "../../../../app/repositories/dto/updateEquipmentDto";
import {Equipment} from "../../../../app/models/Equipment/Equipment";


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

    add(equipment: addProductDto): string {

        return ""
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