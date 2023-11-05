import {EquipmentRepo} from "../../repositories/EquipmentRepo.js";
import {
    postgresEquipmentRepository
} from "../../../infrastructure/db/repository/PostgresQL/EquipmentRepositoryImplement.js";
import {addProductDto} from "../../repositories/dto/addEquipmentDto";


export class EquipmentService {
    constructor(public equipmentRepo: EquipmentRepo) {}

    async getAllEquipments() {
        return this.equipmentRepo.getAll()
    }

    async addNewEquipment(fields: addProductDto) {
        return await this.equipmentRepo.add(fields)
    }
}

export const equipmentService = new EquipmentService(postgresEquipmentRepository)