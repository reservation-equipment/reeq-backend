import {Equipment} from "../../../app/models/Equipment/Equipment";

export type EquipmentStatus = "FREE" | "BOOKED"

export type EquipmentFilter = Omit<Partial<Equipment>, "id" | "area_id" | "description" | "count">