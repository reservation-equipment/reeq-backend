import {UserRoles} from "../../../infrastructure/shared/types/UserTypes";

export class User {
    constructor(readonly id: number,
                public name: string,
                public surname: string,
                private password: string,
                private email: string,
                private role: UserRoles,
    ) {
    }
}