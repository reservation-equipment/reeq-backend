import {EquipmentStatus} from "../../../infrastructure/shared/types/Equipment";

export class Equipment {
    constructor(
        readonly id: number,
        readonly area_id: number,
        public name: string,
        public description: string | null,
        public count: number,
        public img_hrefs: string[],
        public created_at?: Date,
        public updated_at?: Date,
    ) {
    }
}