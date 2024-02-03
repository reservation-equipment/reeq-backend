import {bookingService, BookingService} from "../../../app/services/BookingService/BookingService";
import {NextFunction, Request, Response} from "express";
import * as console from "console";


export class BookingController {
    constructor(private bookingService: BookingService) {
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
            console.log(typeof bookingInfo.date_to, typeof bookingInfo.date_from)
            const createdBooking = await this.bookingService.CreateBooking(bookingInfo)
            res.send({
                msg: `Оборудование ${createdBooking.equipments?.name} успешно забронировано`,
                data: createdBooking
            })
        } catch (e) {
            next(e)
        }
    }

    async getBookingByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = Number(req.params.userId)
            console.log(req.params.userId, userId)
            const listBookings = await this.bookingService.getBookingByUserId(userId)
            res.send({
                msg: `Бронирования юзера успешно получены`,
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

export const bookingController = new BookingController(bookingService)