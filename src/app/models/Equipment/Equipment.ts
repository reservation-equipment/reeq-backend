export class Equipment {
    constructor(
        readonly id: number,
        readonly area_id: number,
        public name: string,
        public description: string | null,
        public count: number,
    ) {
    }
}