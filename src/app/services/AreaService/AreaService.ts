import {AreaRepo} from "../../repositories/AreaRepo.js";
import {
    postgresAreaRepository
} from "../../../infrastructure/db/repository/PostgresQL/AreaRepoImplement.js";
import {addAreaDto} from "../../repositories/dto/addAreaDto.js";
import {updateAreaDto} from "../../repositories/dto/updateAreaDto";

export class AreaService {
    constructor(readonly areaRepo: AreaRepo) {
    }

    async createArea(area: addAreaDto) {
        return this.areaRepo.add(area);
    }

    async getAllAreas() {
        const data = (await this.areaRepo.getAllWithInstitutes()).map((area: any) => {
            const {institutes, ...others} = area
            return {
                ...others,
                institute: institutes.name
            }
        })

        return data
    }

    async deleteArea(id: number) {
        return this.areaRepo.delete(id)
    }

    async getAreaById(id: number) {
        return this.areaRepo.getById(id)
    }

    async updateArea(newData: updateAreaDto) {
        return this.areaRepo.update(newData)
    }
}

export const areaService = new AreaService(postgresAreaRepository)