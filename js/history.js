import { getUserTickets } from "./ticketService.js";

document.addEventListener("DOMContentLoaded", () => {
    initData();
})

function initData() {
    // TODO: get user ID from auth cookie/token
    const tickets = getUserTickets(4567, "customer");
    const pastTickets = tickets.filter(ticket => ticket.status == "Resolved" || ticket.status == "Closed")


    console.log(tickets)

    const empty = document.getElementById("emptyState");
    const table = document.getElementById("ticketsTable");
    const body = document.getElementById("ticketsBody");
    
    if (tickets.length === 0) {
        empty.classList.remove("hidden"); 
        table.classList.add("hidden");
    }
    else {

        pastTickets.forEach(ticket => {
            const row = document.createElement("tr");

            const id = document.createElement("td");
            const idLink = document.createElement("a");
            const subject = document.createElement("td");
            const status = document.createElement("td");
            const priority = document.createElement("td");
            const date = document.createElement("td");

            idLink.textContent = `#${ticket.id}`
            idLink.href = `../pages/ticket_detail.html?id=${ticket.id}`
            id.appendChild(idLink)

            subject.textContent = ticket.subject;
            status.textContent = ticket.status;
            priority.textContent = ticket.priority;
            date.textContent = ticket.date;

            row.append(id, subject, status, priority, date);
            body.appendChild(row);
        })
    }
}