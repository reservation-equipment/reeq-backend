import {Equipment} from "../../models/Equipment/Equipment";

export type addProductDto = Omit<Equipment, "id">