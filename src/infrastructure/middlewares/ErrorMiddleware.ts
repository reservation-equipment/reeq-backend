import {NextFunction, Request, Response} from "express";
import {ErrorsHandler} from "../controllers/Errors/ErrorsController";

export const ErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    if (err instanceof ErrorsHandler) {
        res.status(err.status).send({
                msg: err.message,
                errors: err.errors
            })
    } else {
        res.status(500).send({
            msg: 'Непредвиденная ошибка'
        })
        next(err)
    }
}