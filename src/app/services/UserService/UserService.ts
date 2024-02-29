import {UserRepo} from "../../repositories/UserRepo";
import {addUserDto} from "../../repositories/dto/addUserDto";
import bcrypt from "bcrypt"
import {postgresUserRepository} from "../../../infrastructure/db/repository/PostgresQL/UserRepoImplement";
import {TokenService, tokenService} from "../TokenService/TokenService";
import {UserDto} from "../../repositories/dto/UserDto";
import {ErrorsHandler} from "../../../infrastructure/controllers/Errors/ErrorsController";
import {User} from "../../models/User/User";

export class UserService {
    constructor(private userRepo: UserRepo, private tokenService: TokenService) {
    }

    // Регистрация
    async singUp({password, email, second_name, first_name, role_id}: addUserDto) {

        // проверяем, существует ли уже такой пользователь
        const isExistUser = await this.userRepo.getByFieldName(email, "email")
        if (isExistUser) {
            throw ErrorsHandler.BadRequest("Пользователь с таким email'ом уже существует!")
        }
        const hashPassword = await bcrypt.hash(password, 3)

        // создаем юзера
        const user = await this.userRepo.add(
            {
                password: hashPassword,
                email,
                second_name,
                first_name,
                role_id
            })

        console.log('new user', user)

        return this.generationUserInfo(user)
    }

    // Аутентификация
    async signIn(email: string, password: string) {
        const user = await this.userRepo.getByFieldName(email, "email")
        if(!user) {
            throw ErrorsHandler.BadRequest("Пользователь с таким email не найден")
        }

        const isPasswordsEquals = await bcrypt.compare(password, user.password)
        if(!isPasswordsEquals) {
            throw ErrorsHandler.BadRequest("Неверный пароль")
        }
        return this.generationUserInfo(user)
    }

    async generationUserInfo(user: User) {
        const userDto = new UserDto(user)

        const userPayload = {
            id: userDto.id,
            email: userDto.email,
            role: user?.roles?.role
        }

        // получаем access и refresh токены, в которых лежит инфа по почте и id
        const tokens = await this.tokenService.generateToken(userPayload)

        // Сохраняем refresh token в базе
        await this.tokenService.saveToken(userPayload.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userPayload
        }
    }

    async refreshToken(refreshToken: string) {
        if(!refreshToken) {
            throw ErrorsHandler.UnauthorizedError("Пользователь не авторизован!")
        }
        // Если токен есть, то проверяем его валидность
        const userData = this.tokenService.validateRefreshToken(refreshToken) as {
            id: number,
            email: string,
            role: string
        } | null

        const tokenFromDB = await this.tokenService.findToken(refreshToken)

        if(!userData || !tokenFromDB) {
            throw ErrorsHandler.UnauthorizedError("Пользователь не авторизирован!")
        }

        const user = await this.userRepo.getById(userData?.id)
        if(!user) {
            throw ErrorsHandler.BadRequest("Пользователь не найден!")
        }
        return this.generationUserInfo(user)

    }

    async logout(refreshToken: string) {
        return this.tokenService.removeToken(refreshToken)
    }

}

export const userService = new UserService(postgresUserRepository, tokenService)