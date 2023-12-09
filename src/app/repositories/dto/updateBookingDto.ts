import {Booking} from "../../models/Booking/Booking";

export type updateBookingDto = Partial<Omit<Booking, "equipments">>