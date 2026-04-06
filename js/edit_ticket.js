import { getTicketById, updateTicket } from "./ticketService.js";

document.addEventListener("DOMContentLoaded", async function () {
const params = new URLSearchParams(window.location.search);
const ticketId = parseInt(params.get("id"), 10);
const from = params.get("from");

const cancelBtn = document.querySelector("#cancelBtn");
const saveBtn = document.querySelector("#saveBtn");

cancelBtn.addEventListener("click", () => {
    window.location.href = `/pages/ticket_detail.html?id=${ticketId}&from=${from || "/"}`;
});

const ticket = await getTicketById(ticketId);

if (!ticket) {
    document.querySelector(".form-card").innerHTML = "<h2>Ticket not found</h2>";
    return;
}

document.querySelector("#ticketId input").value = "#" + ticket.ticket_id;
document.querySelector("#subject input").value = ticket.subject;
document.querySelector("#description textarea").value = ticket.description || "";
document.querySelector("#status select").value = ticket.status || "unassigned";
document.querySelector("#priority select").value = ticket.priority || "medium";

saveBtn.addEventListener("click", async () => {
    const subject = document.querySelector("#subject input").value.trim();
    const description = document.querySelector("#description textarea").value.trim();
    const status = document.querySelector("#status select").value;
    const priority = document.querySelector("#priority select").value;

    try {
    await updateTicket(ticketId, {
        subject,
        description,
        status,
        priority,
    });

    window.location.href = `/pages/ticket_detail.html?id=${ticketId}&from=${from || "/"}`;
    } catch (error) {
    alert(error.message || "Failed to update ticket.");
    }
});
});