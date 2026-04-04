// backend/services/ticketService.js
const pool = require("../db");

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
        `
        SELECT *
        FROM ticket
        WHERE ticket_id = $1
        `,
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

    const validPriorities = ["low", "medium", "high", "urgent"];

    if (priority && !validPriorities.includes(priority)){
        throw new Error("INVALID_PRIORITY");
    }

    const result = await pool.query(
        `
        INSERT INTO ticket (subject, description, status, priority, creator_id)
        VALUES ($1, $2, 'unassigned', $3, $4)
        RETURNING *
        `,
        [subject, description, priority || "medium", creatorId]
    );

    return result.rows[0];
}

async function updateTicket(ticketId, fields) {

    if (!ticketId) {
        throw new Error("MISSING_REQUIRED_FIELDS");
    }

    const fieldsAsSetQuery = fields.map(([key, _], index) => `${key} = $${index + 2}`).join(", ");

    const result = await pool.query(
        `
        UPDATE ticket
        SET ${fieldsAsSetQuery}
        WHERE ticket_id = $1
        RETURNING *
        `,
        [ticketId, ...fields.map(([_, value]) => value)]
    );

    if (result.rows.length === 0) {
        throw new Error("TICKET_NOT_FOUND");
    }

    return result.rows[0];
}

async function deleteTicket(ticketId) {
    const result = await pool.query(
        `
        DELETE FROM ticket
        WHERE ticket_id = $1
        RETURNING *
        `,
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