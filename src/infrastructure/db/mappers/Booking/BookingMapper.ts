import {addBookingDto} from "../../../../app/repositories/dto/addBookingDto";

class BookingMapper {
    constructor() {
    }

    public CreateBookingMap(createBooking: addBookingDto) {
        createBooking.date_from = new Date(createBooking.date_from)
        createBooking.date_to = new Date(createBooking.date_to)
        return createBooking
    }
}

export const bookingMapper = new BookingMapper()