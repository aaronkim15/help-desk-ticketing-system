const API_BASE = "http://localhost:4000";

export async function getActiveTicketsByUser(userId) {
const response = await fetch(`${API_BASE}/tickets/active/${userId}`);
if (!response.ok) throw new Error("Failed to fetch active tickets");
return await response.json();
}

export async function getTicketHistoryByUser(userId) {
const response = await fetch(`${API_BASE}/tickets/history/${userId}`);
if (!response.ok) throw new Error("Failed to fetch ticket history");
return await response.json();
}

export async function getTicketById(ticketId) {
const response = await fetch(`${API_BASE}/tickets/${ticketId}`);
if (!response.ok) return null;
return await response.json();
}

export async function createTicket(creatorId, subject, description, priority) {
const response = await fetch(`${API_BASE}/tickets`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    creatorId,
    subject,
    description,
    priority,
    }),
});

const data = await response.json();

if (!response.ok) {
    throw new Error(data.message || "Failed to create ticket");
}

return data.ticket;
}

export async function updateTicket(ticketId, updates) {
const response = await fetch(`${API_BASE}/tickets/${ticketId}`, {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
});

const data = await response.json();

if (!response.ok) {
    throw new Error(data.message || "Failed to update ticket");
}

return data.ticket;
}

export async function deleteTicket(ticketId) {
const response = await fetch(`${API_BASE}/tickets/${ticketId}`, {
    method: "DELETE",
});

const data = await response.json();

if (!response.ok) {
    throw new Error(data.message || "Failed to delete ticket");
}

return data;
}