import {User} from "../../models/User/User";

export class UserDto {
    id: number;
    email: string;

    constructor(model: User | Omit<User, "roles">) {
        this.id = model.id
        this.email = model.mail
    }
}