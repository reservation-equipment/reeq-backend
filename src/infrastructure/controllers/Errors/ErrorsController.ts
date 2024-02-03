export class ErrorsHandler extends Error {

    constructor(public status: number, message: string, public errors = []) {
        super(message)
    }

    /**
     * Обработка ошибок авторизации пользователя
     * @param message
     * @param errors
     * @constructor
     */
    static UnauthorizedError(message: string, errors = []) {
        return new ErrorsHandler(401, message, errors)
    }

    /**
     * Обработка некорректных запросов
     * @param message
     * @param errors
     * @constructor
     */
    static BadRequest(message: string, errors: any = []) {
        return new ErrorsHandler(400, message, errors)
    }

}