import {EquipmentRepo} from "../../repositories/EquipmentRepo.js";
import {
    postgresEquipmentRepository
} from "../../../infrastructure/db/repository/PostgresQL/EquipmentRepoImplement.js";
import {addProductDto} from "../../repositories/dto/addEquipmentDto";
import {Equipment} from "../../models/Equipment/Equipment";
import {EquipmentFilter} from "../../../infrastructure/shared/types/Equipment";


export class EquipmentService {
    constructor(public equipmentRepo: EquipmentRepo) {
    }

    async getAllEquipments(filter: EquipmentFilter) {
        return this.equipmentRepo.getAll(filter)
    }

    async addNewEquipment(fields: addProductDto) {
        return await this.equipmentRepo.add(fields)
    }

    async getEquipmentById(id: number) {
        return await this.equipmentRepo.getById(id)
    }

    async updateEquipment(equipment: Equipment) {
        return await this.equipmentRepo.update(equipment)
    }

    async deleteEquipment(id: number) {
        return await this.equipmentRepo.delete(id)
    }
}

export const equipmentService = new EquipmentService(postgresEquipmentRepository)