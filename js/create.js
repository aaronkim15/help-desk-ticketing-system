import { createTicket } from "./ticketService.js";

const form = document.getElementById("createTicketForm");
const cancelBtn = document.getElementById("cancelBtn");
const formMessage = document.getElementById("formMessage");

cancelBtn.addEventListener("click", ()=> {
    window.location.href = "index.html";
});

function formatDate(d) {
    const day = String(d.getDate()).padStart(2, "0");
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const mon = monthNames[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${mon} ${year}`;
}

form.addEventListener("submit", (e)=> {
    e.preventDefault();

    const subject = document.getElementById("subject").value.trim();
    const description = document.getElementById("description").value.trim();
    const priority = document.getElementById("priority").value;

    if(!subject || !description){
        alert("Subject and Description are required.");
        return;
    }

    const TEST_USER_ID = 4567;

    createTicket(TEST_USER_ID, subject, "Open", priority, formatDate(new Date()));

    if (formMessage){
        formMessage.textContent = "Ticket created (service method).";
        formMessage.classList.remove("hidden");
    }

    window.location.href = "index.html";
});

