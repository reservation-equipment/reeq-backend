import {UserRepo} from "../../repositories/UserRepo";
import {addUserDto} from "../../repositories/dto/addUserDto";

export class UserService {
    constructor(private userRepo: UserRepo) {}

    async singUp({password, mail}: addUserDto) {

        return this.userRepo.add({password, mail})
    }

    async signIn(id: number) {
        return this.userRepo.getById(id)
    }

    async refreshToken() {}


}