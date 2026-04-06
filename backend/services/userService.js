const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

async function authenticateUser(email, password) {
    try {

        // Fetch user by email
        const result = await pool.query(
            `SELECT * FROM "user" WHERE email = $1`,
            [email]
        );

        if (result.rows.length === 0) {
            throw new Error("USER_NOT_FOUND");
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("INVALID_CREDENTIALS");
        }

        const token = jwt.sign(
            {
                user_id: user.user_id, role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
            
        );

        return { user, token };

    } catch (err) {
        throw err
    }
}

module.exports = { signup, authenticateUser };