import {Booking} from "../models/Booking/Booking";
import {addBookingDto} from "./dto/addBookingDto";
import {updateBookingDto} from "./dto/updateBookingDto";

export interface BookingRepo {
    getById(id: number): Promise<Booking[] | null>
    getByFilter(date_to: string, skip: number| undefined, take: number| undefined): Promise<Booking[] | null>
    add(booking: addBookingDto): Promise<Booking>
    update(booking: updateBookingDto): Promise<Omit<Booking, "equipments">>
    getByField(fields: object): Promise<{}[]>
}