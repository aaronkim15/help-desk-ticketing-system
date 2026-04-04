import { getTicketById, updateTicket } from "./ticketService.js";

document.addEventListener("DOMContentLoaded", function() {


    const params = new URLSearchParams(window.location.search);
    const ticketId = params.get("id");
    const from = params.get("from")

    const cancelBtn = document.querySelector("#cancelBtn")

    cancelBtn.addEventListener("click", () => {
        window.location.href = `/pages/ticket_detail.html?id=${ticketId}&from=${from}`
    })


    const ticket = getTicketById(parseInt(ticketId));

    if (!ticket) {
        document.querySelector(".form-card").innerHTML =
            "<h2>Ticket not found</h2>";
        return;
    }

    document.querySelector("#ticketId input").value = "#" + ticket.id;
    document.querySelector("#subject input").value = ticket.subject;
    document.querySelector("#description textarea").value = ticket.description || "";
    document.querySelector("#status select").value = ticket.status || "-";
    document.querySelector("#priority select").value = ticket.priority || "-";

    const saveBtn = document.querySelector("#saveBtn");

    saveBtn.addEventListener("click", async () => {
        const subject = document.querySelector("#subject input").value;
        const description = document.querySelector("#description textarea").value;
        const status = document.querySelector("#status select").value;
        const priority = document.querySelector("#priority select").value;

        const updatedTicket = await updateTicket(parseInt(ticketId), subject, description, priority, status);

        if (updatedTicket) {
            window.location.href = `/pages/ticket_detail.html?id=${ticketId}&from=${from}`;
        }
    });

});