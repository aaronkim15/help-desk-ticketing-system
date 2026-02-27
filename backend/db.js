// backend/db.js
const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "aaronkim", //change to local postgres username
    password: "", //change to local postgres password
    database: "helpdesk", // helpdesk database.
    port: 5432,
});

module.exports = pool;