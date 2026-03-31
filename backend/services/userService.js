const pool = require("../db");
const bcrypt = require("bcrypt");

async function signup(name, email, password, isCustomer = true) {
    try {
        // Check if user already exists
        const existingUser = await pool.query(
            `SELECT * FROM "user" WHERE email = $1`,
            [email]
        );

        if (existingUser.rows.length > 0) {
            throw new Error("USER_ALREADY_EXISTS");
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const role = isCustomer ? "customer" : "support";

        // Insert new user into database
        const result = await pool.query(
            `INSERT INTO "user" (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, email, hashedPassword, role]
        );

        
        return result.rows[0];
        
    } catch(err) {
        throw err
    }
}

module.exports = { signup };