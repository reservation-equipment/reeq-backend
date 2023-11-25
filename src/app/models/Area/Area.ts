export class Area {
    constructor(
        readonly id: number,
        public institutes_id: number,
        readonly name: string | null,
        public square: number | null,
        readonly appointment: string | null // цель, назначение пространства (области, помещения) "Назначение и направления использования применительно к развитию университетского технологического предпринимательства "
    ) {
    }
}