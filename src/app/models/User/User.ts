import {UserRoles} from "../../../infrastructure/shared/types/UserTypes";

export class User {
    constructor(readonly id: number,
                public first_name: string | null,
                public second_name: string | null,
                public password: string,
                public mail: string,
                public role_id: number | null,
                public roles: {
                    role: UserRoles
                } | null
    ) {
    }
}