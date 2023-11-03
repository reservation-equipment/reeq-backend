import {Area} from "../models/Area/Area";
import {addProductDto} from "./dto/addAreaDto";
import {updateAreaDto} from "./dto/updateAreaDto";

export interface AreaRepo {
    getAll(): Area[]
    getById(id: number): Area
    getByFieldName(fieldName: string): Area
    add(equipment: addProductDto): string
    delete(id: number): string
    update(equipment: updateAreaDto): Area
}