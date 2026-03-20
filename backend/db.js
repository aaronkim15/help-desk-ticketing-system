// backend/db.js
const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    user: process.env.DB_USER, //change to local postgres username
    password: process.env.DB_PASSWORD, //change to local postgres password
    database: process.env.DB_NAME, // helpdesk database.
    port: 5432,
});

module.exports = pool;