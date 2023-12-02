import {Token} from "../models/Token/Token";

export interface TokenRepo {
    getById(user_id: number): Promise<Token | null>
    getByField(field: string): Promise<Token | null>
    add(userId: number, token: string): Promise<Token | null>
    update(userId: number, token: string): Promise<Token | null>
    delete(fieldName: string): Promise<Token | null>
}