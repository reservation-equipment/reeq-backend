import {BookingRepo} from "../../repositories/BookingRepo";
import {postgresBookingRepository} from "../../../infrastructure/db/repository/PostgresQL/BookingRepoImplement";
import {addBookingDto, getBookingByParamsDtoType} from "../../repositories/dto/addBookingDto";
import {EquipmentRepo} from "../../repositories/EquipmentRepo";
import {postgresEquipmentRepository} from "../../../infrastructure/db/repository/PostgresQL/EquipmentRepoImplement";
import {EquipmentStatus} from "../../../infrastructure/shared/types/Equipment";
import {BookingStatus} from "../../../infrastructure/shared/types/Booking";
import {ErrorsHandler} from "../../../infrastructure/controllers/Errors/ErrorsController";


export class BookingService {
    constructor(private bookingRepo: BookingRepo, private equipmentRepo: EquipmentRepo) {
    }

    async isBooking(id: number) {
        const booking = await this.equipmentRepo.getById(id)
        return booking?.status === EquipmentStatus.BOOKED
    }

    /**
     * Создание брони конкретного оборудования в БД
     * @param bookingData
     * @constructor
     */
    async CreateBooking(bookingData: addBookingDto) {
        const {equipment_id} = bookingData

        if(await this.isBooking(equipment_id)) {
            throw ErrorsHandler.BadRequest("Оборудование уже забронировано!" )
        }

        const addedBooking = this.bookingRepo.add(bookingData)

        // await this.equipmentRepo.update({
        //     id: equipment_id,
        //     status: EquipmentStatus.BOOKED
        // })

        return addedBooking
    }

    async getBookingByParams(params: getBookingByParamsDtoType) {
        return this.bookingRepo.getByParams(params, {
            equipments: true,
            users: true
        })
    }
    
    async getListUsersForEquipment(equipment_id: number) {
        return this.bookingRepo.getByParams({
            equipment_id
        }, {
            users: {
                select: {
                    id: true,
                    first_name: true,
                    second_name: true,
                    email: true
                }
            }
        })
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

    async getBookings(date: string, skip: number | undefined, take: number | undefined) {
        return this.bookingRepo.getByFilter(date, skip, take)
    }

    async getDatesBooking() {
        const filter = {
            date_to: true
        }
        return this.bookingRepo.getByField(filter)
    }
}

export const bookingService = new BookingService(postgresBookingRepository, postgresEquipmentRepository)