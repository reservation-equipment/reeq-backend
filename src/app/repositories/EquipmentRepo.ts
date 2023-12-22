import {addProductDto} from "./dto/addEquipmentDto.js";
import {Equipment} from "../models/Equipment/Equipment";
import {updateEquipmentDto} from "./dto/updateEquipmentDto";
import {EquipmentFilter} from "../../infrastructure/shared/types/Equipment";

export interface EquipmentRepo {
    getAll(filter: EquipmentFilter, skip?: string, take?: string): Promise<Equipment[]>
    getById(id: number): Promise<Equipment | null>
    getByFieldName(fieldName: string): Promise<Equipment>
    add(equipment: addProductDto): Promise<Equipment>
    delete(id: number): Promise<Equipment>
    update(equipment: updateEquipmentDto): Promise<Equipment>
    getCountRows(): Promise<any>
}