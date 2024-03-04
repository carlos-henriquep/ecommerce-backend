import pg from 'pg'
const {Pool} = pg

const connection = new Pool({
    database: process.env.DATABASE,
    user: process.env.USER_DATABASE,
    password: process.env.USER_PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT
})

export default connection;