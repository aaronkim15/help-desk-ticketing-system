// backend/controllers/ticketController.js
const pool = require("../db");

async function listTickets(req, res) {
    try {
    // listTickets
    const result = await pool.query(
    "SELECT ticket_id, subject, status, priority, updated_on FROM ticket ORDER BY updated_on DESC"
    );
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result.rows));
} catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
}
}

async function getTicketById(req, res, ticketId) {
try {
    const result = await pool.query(
        "SELECT * FROM ticket WHERE ticket_id = $1",
        [ticketId]
    );

    if (result.rows.length === 0) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Ticket not found" }));
        return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result.rows[0]));
} catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
}
}

module.exports = { listTickets, getTicketById };