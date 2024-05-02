import {UserRepo} from "../../../../app/repositories/UserRepo";
import {User} from "../../../../app/models/User/User";
import {prisma} from "../../orm/prisma/PrismaClient";
import {addUserDto} from "../../../../app/repositories/dto/addUserDto";


export class UserRepoImplement implements UserRepo {
	async getByFieldName(fieldName: string, typeField: string): Promise<User | null> {
		return prisma.users.findFirst({
			where: {
				[typeField]: fieldName,
			},
			include: {
				roles: {
					select: {
						role: true
					}
				}
			},
		})
	}
	
	async getBySelect(where: object, select: object) {
		return prisma.users.findMany({
			select,
			where
		})
	}
	
	async getById(id: number) {
		return prisma.users.findUnique({
			where: {
				id
			},
			include: {
				roles: {
					select: {
						role: true
					}
				}
			}
		})
	}
	
	async add(user: addUserDto) {
		return prisma.users.create({
			data: user,
			include: {
				roles: {
					select: {
						role: true
					}
				}
			}
		})
	}
	
}

export const postgresUserRepository = new UserRepoImplement()