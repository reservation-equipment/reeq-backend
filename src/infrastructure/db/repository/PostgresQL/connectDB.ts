import pkg from 'pg'

const {Pool} = pkg;
export const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD),
    port: Number(process.env.DB_EXTERNAL_PORT),
    database: process.env.DB_NAME,
})