import {Equipment} from "../../models/Equipment/Equipment";

export type updateEquipmentDto = Omit<Equipment, "id">
