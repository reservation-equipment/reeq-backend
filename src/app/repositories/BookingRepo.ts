import {Booking} from "../models/Booking/Booking";
import {addBookingDto, getBookingByParamsDtoType} from "./dto/addBookingDto";
import {updateBookingDto} from "./dto/updateBookingDto";

export interface BookingRepo {
    getByFilter(date: string, skip: number| undefined, take: number| undefined): Promise<Booking[] | null>
    add(booking: addBookingDto): Promise<Booking>
    update(booking: updateBookingDto): Promise<Omit<Booking, "equipments">>
    getByField(fields: object): Promise<{}[]>
    getByParams(params: getBookingByParamsDtoType, include: object): any
    getListsTimeReservation(equipment_id: number): any
}