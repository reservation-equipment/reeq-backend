import {User} from "../../models/User/User";

export type addUserDto = Omit<User, "id">