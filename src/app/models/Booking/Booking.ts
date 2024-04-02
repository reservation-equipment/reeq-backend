import {BookingStatus} from "../../../infrastructure/shared/types/Booking";
import {Equipment} from "../Equipment/Equipment";

export class Booking {
    constructor(
        readonly id: number,
        readonly user_id: number,
        readonly equipment_id: number,
        public date: Date,
        public time_from: string,
        public time_to: string,
        public status: keyof typeof BookingStatus,
        public equipments: Equipment | null,
        public created_at?: Date,
        public updated_at?: Date,
    ) {
    }
}