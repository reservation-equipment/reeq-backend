import {NextFunction, Request, Response} from "express";
import {ErrorsHandler} from "../controllers/Errors/ErrorsController";
import {tokenService} from "../../app/services/TokenService/TokenService";

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        // Проверка на наличие токена
        if (!authorizationHeader) {
            return next(ErrorsHandler.UnauthorizedError("Пользователь не авторизован!"));
        }

        const accessToken = authorizationHeader.split(' ')[1];
        // Проверка на наличие, что токен можно извлечь
        if (!accessToken) {
            return next(ErrorsHandler.UnauthorizedError("Пользователь не авторизован!"));
        }

        const userData = tokenService.validateAccessToken(accessToken);
        // Проверка на валидность токена, что токен не подделан
        if (!userData) {
            return next(ErrorsHandler.UnauthorizedError("Пользователь не авторизован!"));
        }

        // req.user = userData;
        next();
    } catch (e) {
        return next(ErrorsHandler.UnauthorizedError("Пользователь не авторизирован"))
    }
}