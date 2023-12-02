export class ErrorsHandler extends Error {

    constructor(public status: number, message: string, public errors = []) {
        super(message)
    }

    static UnauthorizedError(message: string, errors = []) {
        return new ErrorsHandler(401, message, errors)
    }

    static BadRequest(message: string, errors: any = []) {
        return new ErrorsHandler(400, message, errors)
    }

}