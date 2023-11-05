import {pool} from "../repository/PostgresQL/connectDB.js";

class QueriesEquipment {
    async add<T>(obj: T) {
        const fields = obj as string[]
        const values = Object.values(fields)
        try {
            const query = `INSERT INTO equipments (area_id, name, description, count)
                           VALUES ($1, $2, $3, $4)
                           RETURNING *`;
            const res = await pool.query(query, values)
            return res.rows[0]
        } catch (e: any) {
            throw e
        }
    }
}


export const product = new QueriesEquipment()