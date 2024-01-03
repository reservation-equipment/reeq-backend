import {TokenRepo} from "../../../../app/repositories/TokenRepo";
import {Token} from "../../../../app/models/Token/Token";
import {prisma} from "../../orm/prisma/PrismaClient";


class TokenRepoImplement implements TokenRepo {
    async getById(user_id: number){
        return prisma.tokens.findFirst({
            where: {
                user_id
            }
        })
    }

    getByField(field: string): Promise<Token | null> {
        return prisma.tokens.findFirst({
            where: {
                refresh_token: field
            }
        })
    }

    async add(userId:number, token: string) {
        return prisma.tokens.create({
            data: {
                user_id: userId,
                refresh_token: token
            }
        })
    }

    async update(userId: number, token: string): Promise<Token | null> {
        return prisma.tokens.update({
            data: {
                refresh_token: token
            },
            where: {
                user_id: userId
            },
        })
    }

    async delete(field: any) {
        return prisma.tokens.delete({
            where: {
                refresh_token: field
            }
        })
    }
}

export const postgresTokenRepository = new TokenRepoImplement()