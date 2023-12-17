import {Area} from "../../models/Area/Area";

export type updateAreaDto = Omit<Partial<Area>, "institutes_id">
