import {BookingRepo} from "../../../../app/repositories/BookingRepo";
import {Booking} from "../../../../app/models/Booking/Booking";
import {addBookingDto, getBookingByParamsDtoType} from "../../../../app/repositories/dto/addBookingDto";
import {prisma} from "../../orm/prisma/PrismaClient";
import {updateBookingDto} from "../../../../app/repositories/dto/updateBookingDto";


class BookingRepoImplement implements BookingRepo {
    
    async getListsTimeReservation(equipment_id: number) {
        return prisma.booking.findMany({
            where: {
                equipment_id,
            },
            select: {
                date: true,
                time_to: true,
                time_from: true
            }
        })
    }
    
    async getBySelect(where: object, select: object): Promise<Booking[] | null> {
        return prisma.booking.findMany({
            where,
            select
        }) as Promise<Booking[] | null>
    }
    
    async getByParams(params: getBookingByParamsDtoType, include: object) {
        return prisma.booking.findMany({
            where: {
                ...params
            },
            include,
        })
    }

    async getByFilter(date: string, skip: number, take: number): Promise<Booking[] | null> {

        return prisma.booking.findMany({
            ...(
                date ? {
                    where: {
                        date: new Date(date)
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