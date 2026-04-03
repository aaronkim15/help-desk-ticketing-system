import { getTicketById } from "./ticketService.js";

document.addEventListener("DOMContentLoaded", function() {


    const params = new URLSearchParams(window.location.search);
    const ticketId = params.get("id");
    const from = params.get("from")

    const backBtn = document.querySelector("#backBtn")
    const editBtn = document.querySelector("#editBtn")

    backBtn.addEventListener("click", () => {
        if (from) {
            if (from === "/")
                window.location.href = "/"
            else
                window.location.href = `/pages/${from}.html`
        } else {
            window.location.href = "/"
        }
    })

    editBtn.addEventListener("click", () => {
        if (from) {
            window.location.href = `/pages/edit_ticket.html?id=${ticketId}&from=${from}`
        } else {
            window.location.href = `/pages/edit_ticket.html?id=${ticketId}`
        }
    }); 


    const ticket = getTicketById(parseInt(ticketId));

    if (!ticket) {
        document.querySelector(".form-card").innerHTML =
            "<h2>Ticket not found</h2>";
        return;
    }

    document.getElementById("ticketId").textContent = "#" + ticket.id;
    document.getElementById("subject").textContent = ticket.subject || "-";
    document.getElementById("description").textContent = ticket.description || "-";
    document.getElementById("status").textContent = ticket.status || "-";
    document.getElementById("priority").textContent = ticket.priority || "-";

});