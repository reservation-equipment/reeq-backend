import {User} from "../models/User/User";
import {addUserDto} from "./dto/addUserDto";

export interface UserRepo {
    // getAll(): User[]
    getById(id: number): Promise<User | null>
    getByFieldName(fieldName: string, typeField: string): Promise<User | null>
    add(user: addUserDto): Promise<User>
    getBySelect(where: object, select: object): any
    // delete(id: number): string
    // update(user: updateUserDto): User
}