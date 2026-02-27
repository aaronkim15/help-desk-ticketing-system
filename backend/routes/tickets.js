// backend/routes/tickets.js
const { listTickets, getTicketById } = require("../controllers/ticketController");

function ticketsRouter(req, res) {
  // GET /tickets
    if (req.url === "/tickets" && req.method === "GET") {
    return listTickets(req, res);
    }

  // GET /tickets/:id
    const match = req.url.match(/^\/tickets\/(\d+)$/);
    if (match && req.method === "GET") {
    const ticketId = parseInt(match[1], 10);
    return getTicketById(req, res, ticketId);
}

  return false; // not handled
}

module.exports = ticketsRouter;