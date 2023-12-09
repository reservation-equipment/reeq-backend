import {userService, UserService} from "../../../app/services/UserService/UserService";
import {NextFunction, Request, Response} from "express";
import {convertToMilliseconds} from "../../helpers/Time";
import {validationResult} from "express-validator";
import {ErrorsHandler} from "../Errors/ErrorsController";


export class UserController {
    constructor(private userService: UserService) {
    }

    async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                const validationErrors = errors.array()
                    .map((error: any) => {
                    return {
                        msg: `Некорректное значение в поле ${error.path}`,
                    }
                })

                return next(ErrorsHandler.BadRequest('Ошибка при валидации', validationErrors))
            }
            const {email, password, first_name, second_name, role_id} = req.body;
            const userInfo = await this.userService.singUp({
                password,
                mail: email,
                role_id,
                first_name,
                second_name
            })
            res.cookie('refreshToken', userInfo.refreshToken, {
                maxAge: convertToMilliseconds(30, 'd'),
                httpOnly: true
            })
            res.send(
                {
                    msg: "success",
                    status: 200,
                    data: userInfo
                }
            )
        } catch (e: any) {
            next(e)
        }
    }

    async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body
            const userInfo = await this.userService.signIn(email, password)
            res.cookie('refreshToken', userInfo.refreshToken, {
                maxAge: convertToMilliseconds(30, 'd'),
                httpOnly: true
            })
            res.send(
                {
                    msg: "Вы успешно авторизированны!",
                    status: 200,
                    data: userInfo
                }
            )
        } catch (e) {
            next(e)
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies
            const userData = await this.userService.refreshToken(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: convertToMilliseconds(30, 'd'),
                httpOnly: true
            })
            res.send({
                userData
            })
        } catch (e: any) {
            next(e)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies
            const token = await this.userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            res.send({
                statusCode: 200,
                body: token
            })
        } catch (e) {
            next(e)
        }
    }
}

export const userController = new UserController(userService)
