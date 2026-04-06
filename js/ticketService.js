export function getTickets() {
    const allTickets = JSON.parse(localStorage.getItem("tickets"))

    return allTickets;
}

export function getTicketById(id) {
    const allTickets = JSON.parse(localStorage.getItem("tickets"))

    return allTickets.find(ticket => ticket.id === id)
}

export function getUserTickets(userId, role) {
    const allTickets = JSON.parse(localStorage.getItem("tickets"))

    console.log(allTickets)

<<<<<<< HEAD
const data = await response.json();
if (!response.ok) throw new Error(data.message || "Failed to create ticket");
return data.ticket;
}

export async function updateTicket(ticketId, updates) {
const response = await fetch(`${API_BASE}/tickets/${ticketId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
});

const data = await response.json();
if (!response.ok) throw new Error(data.message || "Failed to update ticket");
return data.ticket;
}

export async function deleteTicket(ticketId) {
const response = await fetch(`${API_BASE}/tickets/${ticketId}`, {
    method: "DELETE",
});

const data = await response.json();
if (!response.ok) throw new Error(data.message || "Failed to delete ticket");
return data;
}
=======
    if (role == "support") {
        return allTickets.filter(ticket => ticket.assignee_id == userId)
    }
    else {
        return allTickets.filter(ticket => ticket.creator_id == userId)
    }
}

export function createTicket(userId, subject, status, priority, date) {
    tickets.push({
        id: tickets.at(-1).id + 1,
        subject: subject,
        status: status,
        priority: priority,
        date: date,
        creator_id: userId,
        assignee_id: undefined,
    })

    console.log(tickets)

    localStorage.setItem("tickets", JSON.stringify(tickets))
}

const tickets = [
    {
        id: 19283455,
        subject: "Login not working",
        status: "Open",
        priority: "High",
        date: "29 Jan 2026",
        assignee_id: 3667,
        creator_id: 4567,
    },
    {
        id: 39840508,
        subject: "Password reset not working",
        status: "In progress",
        priority: "Medium",
        date: "27 Jan 2026",
        assignee_id: 4028,
        creator_id: 4567,
    },
    {
        id: 57848239,
        subject: "Feature request: dark mode",
        status: "Resolved",
        priority: "Low",
        date: "22 Jan 2026",
        assignee_id: 4028,
        creator_id: 3993,
    },
    {
        id: 56013749,
        subject: "Error message on checkout page",
        status: "Closed",
        priority: "Urgent",
        date: "22 Jan 2026",
        assignee_id: 4028,
        creator_id: 4567,
    },
    {
        id: 19375960,
        subject: "Email notification not being received",
        status: "In Progress",
        priority: "High",
        date: "31 Jan 2026",
        assignee_id: 3667,
        creator_id: 3993,
    },
]
if (!localStorage.getItem("tickets"))
    localStorage.setItem("tickets", JSON.stringify(tickets))
>>>>>>> e35a45890084ff1d807014d1c1e7c6e4dac544d9
