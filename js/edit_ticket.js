import { getTicketById } from "./ticketService.js";

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

});