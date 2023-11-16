import {User} from "../models/User/User";
import {addUserDto} from "./dto/addUserDto";
import {updateUserDto} from "./dto/updateUserDto";

"/dto/addUserDto"

export interface UserRepo {
    getAll(): User[]
    getById(id: number): User
    getByFieldName(fieldName: string): User
    add(user: addUserDto): Promise<string>
    delete(id: number): string
    update(user: updateUserDto): User

}