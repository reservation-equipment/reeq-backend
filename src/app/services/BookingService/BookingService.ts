import {BookingRepo} from "../../repositories/BookingRepo";
import {postgresBookingRepository} from "../../../infrastructure/db/repository/PostgresQL/BookingRepoImplement";
import {addBookingDto} from "../../repositories/dto/addBookingDto";
import {EquipmentRepo} from "../../repositories/EquipmentRepo";
import {postgresEquipmentRepository} from "../../../infrastructure/db/repository/PostgresQL/EquipmentRepoImplement";
import {updateBookingDto} from "../../repositories/dto/updateBookingDto";


export class BookingService {
    constructor(private bookingRepo: BookingRepo, private equipmentRepo: EquipmentRepo) {
    }

    async CreateBooking(bookingData: addBookingDto) {
        await this.equipmentRepo.update({
            id: bookingData.equipment_id,
            status: "BOOKED"
        })
        return this.bookingRepo.add(bookingData)
    }

    async getBookingByUserId(userId: number) {
        return this.bookingRepo.getById(userId)
    }

    async closeBooking(bookingId: number, equipmentId: number) {
        await this.equipmentRepo.update({
            id: equipmentId,
            status: "FREE"
        })
        return this.bookingRepo.update({
            id: bookingId,
            status: "COMPLETE",
        })
    }

    async getBookings(filter: object, skip: number | undefined, take: number | undefined) {
        return this.bookingRepo.getByFilter(filter, skip, take)
    }
}

export const bookingService = new BookingService(postgresBookingRepository, postgresEquipmentRepository)