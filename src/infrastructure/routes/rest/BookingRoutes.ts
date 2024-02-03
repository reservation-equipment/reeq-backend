import {Routes} from "./Routes";
import {bookingController, BookingController} from "../../controllers/Booking/BookingController";
import {Express} from "express";


export class BookingRoutes implements Routes {
    constructor(private bookingController: BookingController, public initRoutePath: string) {
    }

    initRoutes(router: Express) {
        router.get(`${this.initRoutePath}s`, this.bookingController.getBookings.bind(this.bookingController))
        router.post(`${this.initRoutePath}/create`, this.bookingController.createBooking.bind(this.bookingController))
        router.get(`${this.initRoutePath}/:userId`, this.bookingController.getBookingByUserId.bind(this.bookingController))
        router.patch(`${this.initRoutePath}/close`, this.bookingController.closeBooking.bind(this.bookingController))
        router.get(`${this.initRoutePath}_dates`, this.bookingController.getBookingDateLists.bind(this.bookingController))
    }
}

export const bookingRoutes = new BookingRoutes(bookingController, "/booking")