import {User} from "../../models/User/User";

export type addUserDto = Omit<User, "id" | "first_name" | "second_name" | "role_id">