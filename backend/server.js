// backend/server.js
const http = require("http");
const pool = require("./db");
const ticketsRouter = require("./routes/tickets");

function sendJson(res, status, obj) {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(obj));
}

const server = http.createServer(async (req, res) => {
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
    const handled = ticketsRouter(req, res);
    if (handled !== false) return;

    return sendJson(res, 404, { error: "Not found" });
});

server.listen(4000, () => {
    console.log("Backend running on http://localhost:4000");
});