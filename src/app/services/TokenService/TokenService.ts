import jwt, {Secret} from 'jsonwebtoken';
import * as process from "process";
import {TokenRepo} from "../../repositories/TokenRepo";
import {postgresTokenRepository} from "../../../infrastructure/db/repository/PostgresQL/TokenRepoImplement";
import {UserDto} from "../../repositories/dto/UserDto";

interface IValidateRefreshToken {
    id: number,
    email: string,
    role: string
}

export class TokenService {
    constructor(private tokenRepo: TokenRepo) {
    }

    /**
     * Проверка корректности токена доступа
     * @param token
     */
    public validateAccessToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_TOKEN_ACCESS as Secret)
        } catch (e) {
            return null
        }
    }

    /**
     * Проверка корректности refresh-токена
     * @param token
     */

    public validateRefreshToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_TOKEN_REFRESH as Secret)
        } catch (e) {
            return null
        }
    }

    /**
     * Генерация токенов доступа и refresh'a
     * @param payload
     */

    async generateToken(payload: UserDto) {
        const access_jwt = process.env.JWT_TOKEN_ACCESS as Secret;
        const refresh_jwt = process.env.JWT_TOKEN_REFRESH as Secret;

        const accessToken = jwt.sign(payload, access_jwt, {
            expiresIn: "30m"
        })
        const refreshToken = jwt.sign(payload, refresh_jwt, {
            expiresIn: "30d"
        })

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: number, refreshToken: string) {
        const tokenData = await this.tokenRepo.getById(userId)

        if(tokenData) {
            const updatedToken = await this.tokenRepo.update(userId, refreshToken)
            return updatedToken?.refresh_token
        }

        const token = await this.tokenRepo.add(userId, refreshToken)

        return token?.refresh_token
    }

    async removeToken(refreshToken: string) {
        return await this.tokenRepo.delete(refreshToken)
    }

    async findToken(token: string) {
        return await this.tokenRepo.getByField(token)
    }


 }

 export const tokenService = new TokenService(postgresTokenRepository)