import {Equipment} from "../models/Equipment/Equipment.ts";
import {updateEquipmentDto} from "./dto/updateEquipmentDto.ts";
import {addProductDto} from "./dto/addEquipmentDto.ts";

export interface EquipmentRepo {
    getAll(): Equipment[]
    getById(id: number): Equipment
    getByFieldName(fieldName: string): Equipment
    add(equipment: addProductDto): string
    delete(id: number): string
    update(equipment: updateEquipmentDto): Equipment
}