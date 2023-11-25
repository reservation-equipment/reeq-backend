import {Express} from "express";

export interface Routes {
    initRoutes(router: Express): void
}