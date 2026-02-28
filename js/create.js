import { createTicket } from "./ticketService.js";

const form = document.getElementById("createTicketForm");
const cancelBtn = document.getElementById("cancelBtn");


cancelBtn.addEventListener("click", ()=> {
    window.location.href = "index.html";
});

form.addEventListener("submit", (e)=> {
    e.preventDefault();

    const subject = document.getElementById("subject").value.trim();
    const description = document.getElementById("description").value.trim();
    const category = document.getElementById("category").value;
    const priority = document.getElementById("priority").value;

    if(!subject || !description){
        alert("Subject and Description are required.");
        return;
    }

    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];

    const newId = tickets.length > 0
        ? Math.max(...tickets.map(t => t.id)) + 1
        : 1000;

    const newTicket = {
        id: newId,
        subject,
        description,
        category,
        priority,
        status: "Open",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    tickets.push(newTicket);
    createTicket(newId, subject, "Open", priority, new Date().toISOString())

    localStorage.setItem("tickets", JSON.stringify(tickets));

    console.log("tickets in storage now:", JSON.parse(localStorage.getItem("tickets")));
    window.location.href = "index.html"; //subject to change
});

