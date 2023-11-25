import {Area} from "../models/Area/Area.js";
import {addAreaDto} from "./dto/addAreaDto.js";

export interface AreaRepo {
    getAll(): Promise<Area[]>
    getById(id: number): Promise<Area | null>
    getByFieldName(fieldName: string): Promise<Area | null>
    add(area: addAreaDto): Promise<Area>
    delete(id: number): Promise<Area>
    update(area: Area): Promise<Area>
    getAllWithInstitutes(): any
}