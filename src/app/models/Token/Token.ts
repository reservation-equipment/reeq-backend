export class Token {
    constructor(readonly id: number,
                public user_id: number | null,
                public refresh_token: string,
                public created_at: Date,
                public updated_at: Date,
    ) {
    }
}