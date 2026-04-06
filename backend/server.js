const http = require("http");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const ticketsRouter = require("./routes/tickets");
const pool = require("./db");

const server = http.createServer(async (req, res) => {
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
}

if (req.url === "/health" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
}

if (req.url === "/db-test" && req.method === "GET") {
    try {
    const result = await pool.query("SELECT NOW()");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true, now: result.rows[0] }));
    } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: false, error: error.message }));
    }
    return;
}

if (signupRouter(req, res)) return;
if (loginRouter(req, res)) return;
if (ticketsRouter(req, res)) return;

res.writeHead(404, { "Content-Type": "text/plain" });
res.end("Not found");
});

server.listen(4000, () => {
console.log("Backend running on http://localhost:4000");
});