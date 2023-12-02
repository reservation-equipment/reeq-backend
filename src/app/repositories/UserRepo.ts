import {User} from "../models/User/User";
import {addUserDto} from "./dto/addUserDto";
import {updateUserDto} from "./dto/updateUserDto";

export interface UserRepo {
    // getAll(): User[]
    getById(id: number): Promise<User | null>
    getByFieldName(fieldName: string, typeField: string): Promise<User | null>
    add(user: addUserDto): Promise<User>
    // delete(id: number): string
    // update(user: updateUserDto): User
}