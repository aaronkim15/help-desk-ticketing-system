import { getUserTickets } from "./ticketService.js";

document.addEventListener("DOMContentLoaded", () => {
    initData();
})

function initData() {
    // TODO: get user ID from auth cookie/token
    const tickets = getUserTickets(4567, "customer");

    console.log(tickets)

    const empty = document.getElementById("emptyState");
    const table = document.getElementById("ticketsTable");
    const body = document.getElementById("ticketsBody");
    
    if (!tickets) {
        empty.classList.remove("hidden"); 
        table.classList.add("hidden");
    }
    else {
        tickets.forEach(ticket => {
            const row = document.createElement("tr");

            const id = document.createElement("td");
            const subject = document.createElement("td");
            const status = document.createElement("td");
            const priority = document.createElement("td");
            const date = document.createElement("td");

            id.textContent = `#${ticket.id}`
            subject.textContent = ticket.subject;
            status.textContent = ticket.status;
            priority.textContent = ticket.priority;
            date.textContent = ticket.date;

            row.append(id, subject, status, priority, date);
            body.appendChild(row);
        })
    }
}