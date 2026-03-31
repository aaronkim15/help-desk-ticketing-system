// backend/server.js
require('dotenv').config()
const http = require("http");
const pool = require("./db");
const ticketsRouter = require("./routes/tickets");
const { signupRouter } = require("./routes/signup");
const {loginRouter} = require("./routes/login");

function sendJson(res, status, obj) {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(obj));
}

const server = http.createServer(async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

  // Health check
    if (req.url === "/health" && req.method === "GET") {
        return sendJson(res, 200, { ok: true });
    }

  // DB connectivity check
    if (req.url === "/db-test" && req.method === "GET") {
        try {
        const result = await pool.query("SELECT NOW() AS now");
            return sendJson(res, 200, result.rows[0]);
        } catch (err) {
            return sendJson(res, 500, { error: "DB connection failed", detail: err.message });
        }
    }

  // Tickets routes
    const handled = signupRouter(req, res)
        || loginRouter(req, res);

    console.log("handled:", handled)

    if (!handled) {
        res.writeHead(404);
        res.end('Not found');
    }
});

server.listen(4000, () => {
    console.log("Backend running on http://localhost:4000");
});