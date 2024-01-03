import {Equipment} from "../../../app/models/Equipment/Equipment";

export enum EquipmentStatus {
    FREE = "FREE",
    BOOKED = "BOOKED"
}

export type EquipmentFilter = Partial<Omit<Equipment, "id" | "area_id" | "description" | "count">>