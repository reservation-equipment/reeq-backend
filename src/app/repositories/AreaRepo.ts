import {Area} from "../models/Area/Area.js";
import {addProductDto} from "./dto/addAreaDto.js";
import {updateAreaDto} from "./dto/updateAreaDto.js";

export interface AreaRepo {
    getAll(): Area[]
    getById(id: number): Area
    getByFieldName(fieldName: string): Area
    add(equipment: addProductDto): string
    delete(id: number): string
    update(equipment: updateAreaDto): Area
}