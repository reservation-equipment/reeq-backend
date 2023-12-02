import {Express} from 'express';
import {Routes} from "./Routes";
import {UserController} from "../../controllers/User/UserController";
import {userService} from "../../../app/services/UserService/UserService";
import {body} from 'express-validator';

export const userController = new UserController(userService)

class UserRoutes implements Routes {
    constructor(readonly userControllers: UserController, public initRoutePath: string) {
    }

    initRoutes(router: Express) {
        router.post(`${this.initRoutePath}/signUp`,
            body("email").isEmail(),
            body("password").isLength({
                min: 3,
                max: 30
            }),
            this.userControllers.signUp.bind(this.userControllers))
        router.post(`${this.initRoutePath}/signIn`,
            body("email").isEmail(),
            body("password").isLength({
                min: 3,
                max: 30
            }),
            this.userControllers.signIn.bind(this.userControllers))
        router.post(`${this.initRoutePath}/logOut`,
            this.userControllers.logout.bind(this.userControllers))
        router.get(`${this.initRoutePath}/refresh`,
            this.userControllers.refresh.bind(this.userControllers))
    }
}

export const userRoutes = new UserRoutes(userController, "")