import {EquipmentRepo} from "../../repositories/EquipmentRepo.ts";
import {
    postgresEquipmentRepository
} from "../../../infrastructure/db/repository/PostgresQL/EquipmentRepositoryImplement.ts";


export class EquipmentService {
    constructor(readonly equipmentRepo: EquipmentRepo) {}

    async getAllEquipments() {
        return this.equipmentRepo.getAll()
    }
}

export const equipmentService = new EquipmentService(postgresEquipmentRepository)