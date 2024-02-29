import {User} from "../../models/User/User";

export class UserDto {
    id: number;
    email: string;
    role: string | undefined;

    constructor(model: User) {
        this.id = model.id
        this.email = model.email
        this.role = model.roles?.role
    }
}