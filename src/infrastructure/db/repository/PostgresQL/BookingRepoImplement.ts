import {BookingRepo} from "../../../../app/repositories/BookingRepo";
import {Booking} from "../../../../app/models/Booking/Booking";
import {addBookingDto} from "../../../../app/repositories/dto/addBookingDto";
import {prisma} from "../../orm/prisma/PrismaClient";
import {updateBookingDto} from "../../../../app/repositories/dto/updateBookingDto";
import * as console from "console";


class BookingRepoImplement implements BookingRepo {
    async getById(id: number){
        return prisma.booking.findMany({
            where: {
                user_id: id
            },
            include: {
                equipments: true
            }
        })
    }

    async getByFilter(date_to: string, skip: number, take: number): Promise<Booking[] | null> {

        return prisma.booking.findMany({
            ...(
                date_to ? {
                    where: {
                        date_to: new Date(date_to)
                    },
                } : {}
            ),
            include: {
                equipments: true,
                users: {
                    select: {
                        id: true,
                        roles: true,
                        first_name: true,
                        second_name: true,
                        email: true
                    }
                }
            },
            skip,
            take
        })
    }

    /**
     * Добавление бронирования в БД
     * @param booking
     */
    async add(booking: addBookingDto): Promise<Booking> {
        return prisma.booking.create({
            data: {
                ...booking
            },
            include: {
                equipments: true
            }
        })
    }

    async update(booking: updateBookingDto) {
        const {id, ...other} = booking
        return prisma.booking.update({
            data: {
                ...other
            },
            where: {
                id
            }
        })
    }

    async getByField(fields: object) {
        return prisma.booking.findMany({
            select: fields,
        });
    }
}

export const postgresBookingRepository = new BookingRepoImplement()