export class Area {
    constructor(
        readonly id: number,
        public institutes_id: number,
        readonly name: string,
        public square: number | null,
        public address: string | null,
        readonly appointment: string | null, // цель, назначение пространства (области, помещения) "Назначение и направления использования применительно к развитию университетского технологического предпринимательства "
        public created_at?: Date,
        public updated_at?: Date,
    ) {
    }
}