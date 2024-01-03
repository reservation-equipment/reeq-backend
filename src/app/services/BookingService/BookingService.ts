import {BookingRepo} from "../../repositories/BookingRepo";
import {postgresBookingRepository} from "../../../infrastructure/db/repository/PostgresQL/BookingRepoImplement";
import {addBookingDto} from "../../repositories/dto/addBookingDto";
import {EquipmentRepo} from "../../repositories/EquipmentRepo";
import {postgresEquipmentRepository} from "../../../infrastructure/db/repository/PostgresQL/EquipmentRepoImplement";
import {EquipmentStatus} from "../../../infrastructure/shared/types/Equipment";
import {BookingStatus} from "../../../infrastructure/shared/types/Booking";


export class BookingService {
    constructor(private bookingRepo: BookingRepo, private equipmentRepo: EquipmentRepo) {
    }

    async isBooking(id: number) {
        const booking = await this.equipmentRepo.getById(id)
        return booking?.status === EquipmentStatus.BOOKED
    }


    async CreateBooking(bookingData: addBookingDto) {
        const {equipment_id} = bookingData
        if(await this.isBooking(equipment_id)) {
            throw Error("Оборудование уже забронировано!")
        }
        await this.equipmentRepo.update({
            id: equipment_id,
            status: EquipmentStatus.BOOKED
        })
        return this.bookingRepo.add(bookingData)
    }

    async getBookingByUserId(userId: number) {
        return this.bookingRepo.getById(userId)
    }

    async closeBooking(bookingId: number, equipmentId: number) {
        await this.equipmentRepo.update({
            id: equipmentId,
            status: EquipmentStatus.FREE
        })
        return this.bookingRepo.update({
            id: bookingId,
            status: BookingStatus.COMPLETE,
        })
    }

    async getBookings(filter: object, skip: number | undefined, take: number | undefined) {
        return this.bookingRepo.getByFilter(filter, skip, take)
    }
}

export const bookingService = new BookingService(postgresBookingRepository, postgresEquipmentRepository)