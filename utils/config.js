require("dotenv").config()

let { PORT,
    BD_SCHEMA,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    SECRET } = process.env

if (process.env.NODE_ENV === "test") {  BD_SCHEMA = process.env.TEST_BD_SCHEMA}

module.exports = { 
    PORT,
    BD_SCHEMA,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    SECRET }