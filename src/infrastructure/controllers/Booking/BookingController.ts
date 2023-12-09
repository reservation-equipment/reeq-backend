import {bookingService, BookingService} from "../../../app/services/BookingService/BookingService";
import {NextFunction, Request, Response} from "express";


export class BookingController {
    constructor(private bookingService: BookingService) {
    }

    async createBooking(req: Request, res: Response, next: NextFunction) {
        try {
            const bookingInfo = req.body
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

}

export const bookingController = new BookingController(bookingService)