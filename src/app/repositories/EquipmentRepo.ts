import {addProductDto} from "./dto/addEquipmentDto.js";
import {Equipment} from "../models/Equipment/Equipment";
import {updateEquipmentDto} from "./dto/updateEquipmentDto";

export interface EquipmentRepo {
    getAll(): Promise<Equipment[]>
    getById(id: number): Promise<Equipment | null>
    getByFieldName(fieldName: string): Equipment
    add(equipment: addProductDto): Promise<Equipment>
    delete(id: number): Promise<Equipment>
    update(equipment: updateEquipmentDto): Promise<Equipment>
}