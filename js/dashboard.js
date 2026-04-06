import { getUserTickets } from "./ticketService.js";

document.addEventListener("DOMContentLoaded", () => {
    initData();
})

function initData() {
    // TODO: get user ID from auth cookie/token
    const tickets = getUserTickets(4567, "customer");
    const activeTickets = tickets.filter(ticket => ticket.status != "Resolved" && ticket.status != "Closed")

    console.log(tickets)

    const empty = document.getElementById("emptyState");
    const table = document.getElementById("ticketsTable");
    const body = document.getElementById("ticketsBody");
    
    if (activeTickets.length === 0) {
        empty.classList.remove("hidden"); 
        table.classList.add("hidden");
    }
    else {

<<<<<<< HEAD
try {
    const tickets = await getActiveTicketsByUser(userId);

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
    idLink.href = `../pages/ticket_detail.html?id=${ticket.ticket_id}&from=/`;
    id.appendChild(idLink);

    subject.textContent = ticket.subject;
    status.textContent = ticket.status;
    priority.textContent = ticket.priority;
    date.textContent = formatDate(ticket.updated_on);

    row.append(id, subject, status, priority, date);
    body.appendChild(row);
    });
} catch {
    empty.classList.remove("hidden");
    table.classList.add("hidden");
}
=======
        activeTickets.forEach(ticket => {
            const row = document.createElement("tr");

            const id = document.createElement("td");
            const idLink = document.createElement("a");
            const subject = document.createElement("td");
            const status = document.createElement("td");
            const priority = document.createElement("td");
            const date = document.createElement("td");

            idLink.textContent = `#${ticket.id}`
            idLink.href = `../pages/ticket_detail.html?id=${ticket.id}&from=/`
            id.appendChild(idLink)

            subject.textContent = ticket.subject;
            status.textContent = ticket.status;
            priority.textContent = ticket.priority;
            date.textContent = ticket.date;

            row.append(id, subject, status, priority, date);
            body.appendChild(row);
        })
    }
>>>>>>> e35a45890084ff1d807014d1c1e7c6e4dac544d9
}