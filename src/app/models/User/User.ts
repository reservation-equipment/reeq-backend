import {UserRoles} from "../../../infrastructure/shared/types/UserTypes";

export class User {
    constructor(readonly id: number,
                public first_name: string | null,
                public second_name: string | null,
                public password: string,
                public email: string,
                public role_id: number | null,
                public roles: {
                    role: UserRoles
                } | null,
                public created_at?: Date,
                public updated_at?: Date,
    ) {
    }
}