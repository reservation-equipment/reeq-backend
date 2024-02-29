import {EquipmentRepo} from "../../repositories/EquipmentRepo.js";
import {
    postgresEquipmentRepository
} from "../../../infrastructure/db/repository/PostgresQL/EquipmentRepoImplement.js";
import {addProductDto} from "../../repositories/dto/addEquipmentDto";
import {Equipment} from "../../models/Equipment/Equipment";
import {EquipmentFilter} from "../../../infrastructure/shared/types/Equipment";
import {uploadService, UploadService} from "../UploadService/UploadService";
import {PutObjectRequest} from "aws-sdk/clients/s3";


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
        return await this.equipmentRepo.add(fields)
    }

    async getEquipmentById(id: number) {
        return await this.equipmentRepo.getById(id)
    }

    async updateEquipment(equipment: Equipment) {
        return await this.equipmentRepo.update(equipment)
    }

    async deleteEquipment(id: number) {
        try {
            const equipment = await this.equipmentRepo.getById(id)
            equipment?.img_hrefs?.forEach(async (imgName) => {
                const params: PutObjectRequest = {
                    Bucket: 'reeq-files',
                    Key: `images/${imgName}`,
                }
                await this.uploadService.RemoveImageFromYandexS3(params)
            })
        }
        catch (e) {
            console.log(e)
        }

        return await this.equipmentRepo.delete(id)
    }
}

export const equipmentService = new EquipmentService(postgresEquipmentRepository, uploadService)