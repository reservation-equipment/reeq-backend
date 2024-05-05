import {bookingService, BookingService} from "../../../app/services/BookingService/BookingService";
import {NextFunction, Request, Response} from "express";
import * as console from "console";
import {getBookingByParams} from "../../shared/types/Booking";
import {getBookingByParamsDto} from "../../../app/repositories/dto/addBookingDto";
import {bookingValidations, BookingValidations} from "../../validations/Booking/BookingValidations";


export class BookingController {
    constructor(private bookingService: BookingService, private validation: BookingValidations) {
    }

    async getBookings(req: Request, res: Response, next: NextFunction) {
        try {

            const {date_to, skip, take} = req.query

            const bookings = await this.bookingService.getBookings(date_to as string, skip ? Number(skip) : undefined, take ? Number(take) : undefined)
            res.send({
                msg: 'Бронирования успешно получены!',
                data: bookings
            })
        } catch (e) {
            next(e)
        }
    }

    async createBooking(req: Request, res: Response, next: NextFunction) {
        try {
            const bookingInfo = req.body
            const {equipment_id, time_from, time_to, date} = bookingInfo
            const isValidTime = await this.validation.validationTimeReservationForm(equipment_id, time_from, time_to, date)
            
            if(isValidTime.isValid) {
                const createdBooking = await this.bookingService.CreateBooking(bookingInfo)
                res.send({
                    msg: `Оборудование ${createdBooking.equipments?.name} успешно забронировано`,
                    data: createdBooking
                })
            } else {
                res.send({
                    msg: isValidTime.msg,
                    err: new Error(isValidTime.errMsg).message
                })
            }
        } catch (e) {
            next(e)
        }
    }
    
    async getBookingByParams(req: Request<getBookingByParams>, res: Response, next: NextFunction) {
        try {
            const params = getBookingByParamsDto(req.query);
            const listBookings = await this.bookingService.getBookingByParams(params)
            res.send({
                msg: 'Бронирования успешно получены!',
                data: listBookings
            })
        } catch (e) {
            next(e)
        }
    }

    async closeBooking(req: Request, res: Response, next: NextFunction) {
        try {
            const closeData = req.body
            const {booking_id, equipment_id} = closeData
            const closedBooking = await this.bookingService.closeBooking(booking_id, equipment_id)
            res.send({
                msg: "Бронь успешно закрыта!",
                data: closedBooking
            })
        } catch (e) {
            next(e)
        }
    }

    async getBookingDateLists(req: Request, res: Response, next: NextFunction) {
        try {
            const dates = await this.bookingService.getDatesBooking()
            res.send({
                msg: "Даты бронирования успешно получены!",
                data: dates
            })
        } catch (e) {
            next(e)
        }
    }

}

export const bookingController = new BookingController(bookingService, bookingValidations)