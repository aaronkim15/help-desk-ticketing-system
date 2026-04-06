import { getTicketById, deleteTicket } from "./ticketService.js";

document.addEventListener("DOMContentLoaded", async () => {
const params = new URLSearchParams(window.location.search);
const ticketId = parseInt(params.get("id"), 10);
const from = params.get("from");

const backBtn = document.getElementById("backBtn");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");

backBtn?.addEventListener("click", () => {
    if (from) {
    if (from === "/") {
        window.location.href = "/";
    } else {
        window.location.href = `/pages/${from}.html`;
    }
    } else {
    window.location.href = "/";
    }
});

editBtn?.addEventListener("click", () => {
    if (from) {
    window.location.href = `/pages/edit_ticket.html?id=${ticketId}&from=${from}`;
    } else {
    window.location.href = `/pages/edit_ticket.html?id=${ticketId}`;
    }
});

deleteBtn?.addEventListener("click", async () => {
    const confirmed = confirm("Are you sure you want to delete this ticket?");
    if (!confirmed) return;

    try {
    await deleteTicket(ticketId);
    if (from === "history") {
        window.location.href = "/pages/history.html";
    } else {
        window.location.href = "/";
    }
    } catch (error) {
    alert(error.message || "Failed to delete ticket.");
    }
});

try {
    const ticket = await getTicketById(ticketId);

    if (!ticket) {
    document.querySelector(".form-card").innerHTML = "<h2>Ticket not found</h2>";
    return;
    }

    document.getElementById("ticketId").textContent = `#${ticket.ticket_id}`;
    document.getElementById("subject").textContent = ticket.subject || "-";
    document.getElementById("description").textContent = ticket.description || "-";
    document.getElementById("status").textContent = ticket.status || "-";
    document.getElementById("priority").textContent = ticket.priority || "-";
} catch (error) {
    document.querySelector(".form-card").innerHTML = "<h2>Failed to load ticket</h2>";
}
});