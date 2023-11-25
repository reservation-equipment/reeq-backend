export class User {
    constructor(readonly id: number,
                public first_name: string,
                public second_name: string,
                private password: string,
                private mail: string,
                private role_id: number,
    ) {
    }
}