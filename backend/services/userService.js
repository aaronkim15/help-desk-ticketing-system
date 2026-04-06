const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

async function createUser(name, email, password) {
if (!name || !email || !password) {
    throw new Error("MISSING_REQUIRED_FIELDS");
}

const existingUser = await pool.query(
    `SELECT user_id FROM "user" WHERE email = $1`,
    [email]
);

if (existingUser.rows.length > 0) {
    throw new Error("EMAIL_ALREADY_EXISTS");
}

const hashedPassword = await bcrypt.hash(password, 10);

const result = await pool.query(
    `
    INSERT INTO "user" (name, email, password, role)
    VALUES ($1, $2, $3, 'customer')
    RETURNING user_id, name, email, role
    `,
    [name.trim(), email.trim(), hashedPassword]
);

return result.rows[0];
}

async function loginUser(email, password) {
if (!email || !password) {
    throw new Error("MISSING_REQUIRED_FIELDS");
}

const result = await pool.query(
    `
    SELECT user_id, name, email, role, password
    FROM "user"
    WHERE email = $1
    `,
    [email]
);

if (result.rows.length === 0) {
    throw new Error("INVALID_CREDENTIALS");
}

const user = result.rows[0];

const passwordMatch = await bcrypt.compare(password, user.password);
if (!passwordMatch) {
    throw new Error("INVALID_CREDENTIALS");
}

const token = jwt.sign(
    {
    user_id: user.user_id,
    email: user.email,
    role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
);

return {
    token,
    user_id: user.user_id,
    name: user.name,
    email: user.email,
    role: user.role,
};
}

async function getUserById(userId) {
const result = await pool.query(
    `
    SELECT user_id, name, email, role
    FROM "user"
    WHERE user_id = $1
    `,
    [userId]
);

if (result.rows.length === 0) {
    throw new Error("USER_NOT_FOUND");
}

return result.rows[0];
}

module.exports = {
createUser,
loginUser,
getUserById,
};