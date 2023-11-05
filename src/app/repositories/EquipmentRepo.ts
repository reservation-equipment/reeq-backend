import {Equipment} from "../models/Equipment/Equipment.js";
import {updateEquipmentDto} from "./dto/updateEquipmentDto.js";
import {addProductDto} from "./dto/addEquipmentDto.js";

export interface EquipmentRepo {
    getAll(): Equipment[]
    getById(id: number): Equipment
    getByFieldName(fieldName: string): Equipment
    add(equipment: addProductDto): Promise<string>
    delete(id: number): string
    update(equipment: updateEquipmentDto): Equipment
}