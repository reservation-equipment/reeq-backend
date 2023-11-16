import {Equipment} from "../models/Equipment/Equipment.js";
import {updateEquipmentDto} from "./dto/updateEquipmentDto.js";
import {addProductDto} from "./dto/addEquipmentDto.js";

export interface EquipmentRepo {
    getAll(): Equipment[]
    getById(id: number): Promise<Equipment | null>
    getByFieldName(fieldName: string): Equipment
    add(equipment: addProductDto): Promise<Equipment>
    delete(id: number): string
    update(equipment: updateEquipmentDto): Equipment
}