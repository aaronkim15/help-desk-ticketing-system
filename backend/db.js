const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "helpdesk",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

module.exports = pool;