export class ErrorsHandler {
    constructor() {
    }

    HandlerError(res: any, error: Error, code: number, msg: string) {
        if (error) res.status(code).json(msg)
    }
}

export const errorsHandler = new ErrorsHandler()