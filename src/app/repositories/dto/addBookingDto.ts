import {Booking} from "../../models/Booking/Booking";

export type addBookingDto = Omit<Booking, "id" | "created_at" | "updated_at" | "equipments">