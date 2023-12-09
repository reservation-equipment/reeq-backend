import {Routes} from "./Routes";
import {bookingController, BookingController} from "../../controllers/Booking/BookingController";
import {Express} from "express";


export class BookingRoutes implements Routes {
    constructor(private bookingController: BookingController, public initRoutePath: string) {
    }

    initRoutes(router: Express) {
        router.post(`${this.initRoutePath}/create`, this.bookingController.createBooking.bind(this.bookingController))
        router.get(`${this.initRoutePath}/:userId`, this.bookingController.getBookingByUserId.bind(this.bookingController))
        router.patch(`${this.initRoutePath}/close`, this.bookingController.closeBooking.bind(this.bookingController))
    }
}

export const bookingRoutes = new BookingRoutes(bookingController, "/booking")