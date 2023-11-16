import {User} from "../../models/User/User";

export type updateUserDto = Omit<User, "id">