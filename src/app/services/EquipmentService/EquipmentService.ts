import {EquipmentRepo} from "../../repositories/EquipmentRepo.js";
import {
    postgresEquipmentRepository
} from "../../../infrastructure/db/repository/PostgresQL/EquipmentRepoImplement.js";
import {addProductDto} from "../../repositories/dto/addEquipmentDto";
import {Equipment} from "../../models/Equipment/Equipment";
import {EquipmentFilter} from "../../../infrastructure/shared/types/Equipment";
import {uploadService, UploadService} from "../UploadService/UploadService";


export class EquipmentService {
    constructor(public equipmentRepo: EquipmentRepo, private uploadService: UploadService) {
    }

    async getAllEquipments(filter: EquipmentFilter, skip?: number, take?: number) {
        const count = await this.equipmentRepo.getCountRows(filter);
        const data = await this.equipmentRepo.getAll(filter, skip, take)

        return {
            data,
            count
        }
    }

    async addNewEquipment(fields: addProductDto) {
        const {image_equipment, ...othersFields} = fields
        // await this.uploadService.UploadImages(image_equipment);
        return await this.equipmentRepo.add(othersFields)
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

export const equipmentService = new EquipmentService(postgresEquipmentRepository, uploadService)