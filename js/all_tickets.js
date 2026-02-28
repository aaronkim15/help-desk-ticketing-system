// parses the json file into separate ticket js objects
function getTickets(){
    return JSON.parse(localStorage.getItem("tickets")) || [];
}

// creates and returns an iso date object 
function formatDate(iso){
    if (!iso) return "-";
    return new Date(iso).toISOString();
}

const tickets = getTickets();
const active = tickets.filter(t => t.status !== "Resolved"); // keep only non resolved tickets.

const body = document.getElementById("ticketsBody");
const empty = document.getElementById("emptyState");
const table = document.getElementById("ticketsTable");

if (active.length === 0){
    empty.classList.remove("hidden"); 
    table.classList.add("hidden");
} else {
    active.forEach(t => {
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>#${t.id}</td>
        <td>${t.subject}</td>
        <td>${t.status}</td>
        <td>${t.priority}</td>
        <td>${formatDate(t.updatedAt)}</td>
        `;

        row.addEventListener("click", ()=> {
            window.location.href = `ticket_detail.html?id=${t.id}`;
        });

        body.appendChild(row);
    });
}
