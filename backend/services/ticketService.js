const pool = require("../db");

const VALID_PRIORITIES = ["low", "medium", "high", "urgent"];
const VALID_STATUSES = ["unassigned", "assigned", "in_progress", "resolved", "closed"];

async function getTicketHistoryByUser(userId) {
const result = await pool.query(
    `
    SELECT *
    FROM ticket
    WHERE creator_id = $1
        AND status IN ('resolved', 'closed')
    ORDER BY updated_on DESC, created_on DESC
    `,
    [userId]
);

return result.rows;
}

async function getActiveTicketsByUser(userId) {
const result = await pool.query(
    `
    SELECT *
    FROM ticket
    WHERE creator_id = $1
        AND status IN ('unassigned', 'assigned', 'in_progress')
    ORDER BY updated_on DESC, created_on DESC
    `,
    [userId]
);

return result.rows;
}

async function getTicketById(ticketId) {
const result = await pool.query(
    `SELECT * FROM ticket WHERE ticket_id = $1`,
    [ticketId]
);

if (result.rows.length === 0) {
    throw new Error("TICKET_NOT_FOUND");
}

return result.rows[0];
}

async function createTicket(subject, description, priority, creatorId) {
if (!subject || !description || !creatorId) {
    throw new Error("MISSING_REQUIRED_FIELDS");
}

if (priority && !VALID_PRIORITIES.includes(priority)) {
    throw new Error("INVALID_PRIORITY");
}

const result = await pool.query(
    `
    INSERT INTO ticket (subject, description, status, priority, creator_id)
    VALUES ($1, $2, 'unassigned', $3, $4)
    RETURNING *
    `,
    [subject.trim(), description.trim(), priority || "medium", creatorId]
);

return result.rows[0];
}

async function updateTicket(ticketId, fields) {
if (!ticketId || !fields || fields.length === 0) {
    throw new Error("MISSING_REQUIRED_FIELDS");
}

const cleanedFields = fields.map(([key, value]) => {
    if (key === "subject" || key === "description") {
    if (!value || !String(value).trim()) {
        throw new Error("MISSING_REQUIRED_FIELDS");
    }
    return [key, String(value).trim()];
    }

    if (key === "priority") {
    if (!VALID_PRIORITIES.includes(value)) {
        throw new Error("INVALID_PRIORITY");
    }
    }

    if (key === "status") {
    if (!VALID_STATUSES.includes(value)) {
        throw new Error("INVALID_STATUS");
    }
    }

    return [key, value];
});

const setQuery = cleanedFields
    .map(([key], index) => `${key} = $${index + 2}`)
    .join(", ");

const values = [ticketId, ...cleanedFields.map(([, value]) => value)];

const result = await pool.query(
    `
    UPDATE ticket
    SET ${setQuery}, updated_on = CURRENT_TIMESTAMP
    WHERE ticket_id = $1
    RETURNING *
    `,
    values
);

if (result.rows.length === 0) {
    throw new Error("TICKET_NOT_FOUND");
}

return result.rows[0];
}

async function deleteTicket(ticketId) {
const result = await pool.query(
    `DELETE FROM ticket WHERE ticket_id = $1 RETURNING *`,
    [ticketId]
);

if (result.rows.length === 0) {
    throw new Error("TICKET_NOT_FOUND");
}

return result.rows[0];
}

module.exports = {
getTicketHistoryByUser,
getActiveTicketsByUser,
getTicketById,
createTicket,
updateTicket,
deleteTicket,
};