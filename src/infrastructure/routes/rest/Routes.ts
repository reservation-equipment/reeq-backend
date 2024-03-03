import {Router} from "express";

export interface Routes {
    initRoutes(router: Router): void
}