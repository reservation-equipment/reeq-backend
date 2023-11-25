export class ErrorsHandler {
    constructor() {
    }

    async HandlerError(res: any, error: Error, code: number, msg: string) {
        if (error) {
            res.json(error.message, msg)
            res.sendStatus(code)
        }
    }
}

export const errorsHandler = new ErrorsHandler()