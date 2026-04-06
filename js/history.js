import { getTicketHistoryByUser } from "./ticketService.js";

document.addEventListener("DOMContentLoaded", initData);

function formatDate(value) {
if (!value) return "-";
return new Date(value).toLocaleString();
}

async function initData() {
const userId = parseInt(localStorage.getItem("user_id"), 10);
if (!userId) return;

const empty = document.getElementById("emptyState");
const table = document.getElementById("ticketsTable");
const body = document.getElementById("ticketsBody");

try {
    const tickets = await getTicketHistoryByUser(userId);

    if (!tickets.length) {
    empty.classList.remove("hidden");
    table.classList.add("hidden");
    return;
    }

    body.innerHTML = "";

    tickets.forEach((ticket) => {
    const row = document.createElement("tr");

    const id = document.createElement("td");
    const idLink = document.createElement("a");
    const subject = document.createElement("td");
    const status = document.createElement("td");
    const priority = document.createElement("td");
    const date = document.createElement("td");

    idLink.textContent = `#${ticket.ticket_id}`;
    idLink.href = `../pages/ticket_detail.html?id=${ticket.ticket_id}&from=history`;
    id.appendChild(idLink);

    subject.textContent = ticket.subject;
    status.textContent = ticket.status;
    priority.textContent = ticket.priority;
    date.textContent = formatDate(ticket.updated_on);

    row.append(id, subject, status, priority, date);
    body.appendChild(row);
    });
} catch (error) {
    empty.classList.remove("hidden");
    table.classList.add("hidden");
}
}