// backend/routes/tickets.js
const {
  getTicketHistoryByUser,
  getActiveTicketsByUser,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} = require("../services/ticketService");

function ticketsRouter(req, res) {
  const historyMatch = req.url.match(/^\/tickets\/history\/(\d+)$/);
  if (historyMatch && req.method === "GET") {
    const userId = parseInt(historyMatch[1], 10);

    (async () => {
      try {
        const tickets = await getTicketHistoryByUser(userId);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(tickets));
      } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Failed to fetch ticket history" }));
      }
    })();

    return true;
  }

  const activeMatch = req.url.match(/^\/tickets\/active\/(\d+)$/);
  if (activeMatch && req.method === "GET") {
    const userId = parseInt(activeMatch[1], 10);

    (async () => {
      try {
        const tickets = await getActiveTicketsByUser(userId);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(tickets));
      } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Failed to fetch active tickets" }));
      }
    })();

    return true;
  }

  const ticketMatch = req.url.match(/^\/tickets\/(\d+)$/);
  if (ticketMatch && req.method === "GET") {
    const ticketId = parseInt(ticketMatch[1], 10);

    (async () => {
      try {
        const ticket = await getTicketById(ticketId);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(ticket));
      } catch (error) {
        if (error.message === "TICKET_NOT_FOUND") {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Ticket not found" }));
        } else {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Failed to fetch ticket" }));
        }
      }
    })();

    return true;
  }

  if (ticketMatch && req.method === "PATCH") {
      const ticketId = parseInt(ticketMatch[1], 10);

      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", async () => {
        try {
          const fields = JSON.parse(body);

          const allowedFields = ["subject", "description", "priority", "status"];

          const validFields = Object.entries(fields).filter(([key]) => allowedFields.includes(key));

          if (validFields.length === 0) {
            throw new Error("MISSING_REQUIRED_FIELDS");
          }

          const updatedTicket = await updateTicket(ticketId, validFields);

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              message: "Ticket updated successfully",
              ticket: updatedTicket,
            })
          );
        } catch (error) {
          if (error.message === "TICKET_NOT_FOUND") {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Ticket not found" }));
          } else if (error.message === "MISSING_REQUIRED_FIELDS") {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Missing required fields" }));
          } else {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Failed to update ticket" }));
          }
        }
      });


    return true;
  }

  if (ticketMatch && req.method === "DELETE") {
    const ticketId = parseInt(ticketMatch[1], 10);

    (async () => {
      try {
        await deleteTicket(ticketId);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Ticket deleted successfully" }));
      } catch (error) {
        if (error.message === "TICKET_NOT_FOUND") {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Ticket not found" }));
        } else {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Failed to delete ticket" }));
        }
      }
    })();

    return true;
  }

  if (req.url === "/tickets" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const { subject, description, priority, creatorId } = JSON.parse(body);

        const ticket = await createTicket(
          subject,
          description,
          priority,
          creatorId
        );

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Ticket created successfully",
            ticket,
          })
        );
      } catch (error) {
        if (error.message === "MISSING_REQUIRED_FIELDS") {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Missing required fields" }));
        }
        else if(error.message === "INVALID_PRIORITY"){
          res.writeHead(400, {"Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Invalid priority value" }));
        
        } else {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Failed to create ticket" }));
        }
      }
    });

    return true;
  }

  return false;
}

module.exports = ticketsRouter;