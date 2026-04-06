import { createTicket } from "./ticketService.js";

document.addEventListener("DOMContentLoaded", () => {
const form = document.getElementById("createTicketForm");
const cancelBtn = document.getElementById("cancelBtn");
const formMessage = document.getElementById("formMessage");

if (!form) return;

cancelBtn?.addEventListener("click", () => {
    window.location.href = "../index.html";
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const creatorId = parseInt(localStorage.getItem("user_id"), 10);
    const subject = document.getElementById("subject").value.trim();
    const description = document.getElementById("description").value.trim();
    const priority = document.getElementById("priority").value;

    if (!creatorId) {
    alert("Please log in first.");
    window.location.href = "./login.html";
    return;
    }

    if (!subject || !description) {
    alert("Subject and description are required.");
    return;
    }

    try {
    await createTicket(creatorId, subject, description, priority);

    if (formMessage) {
        formMessage.textContent = "Ticket created successfully.";
        formMessage.classList.remove("hidden");
    }

    window.location.href = "../index.html";
    } catch (error) {
    alert(error.message || "Failed to create ticket.");
    }
});
});