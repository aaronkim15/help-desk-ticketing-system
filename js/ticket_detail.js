<<<<<<< HEAD
import { getTicketById, deleteTicket } from "./ticketService.js";

document.addEventListener("DOMContentLoaded", async function () {
const params = new URLSearchParams(window.location.search);
const ticketId = parseInt(params.get("id"), 10);
const from = params.get("from");

const backBtn = document.querySelector("#backBtn");
const editBtn = document.querySelector("#editBtn");
const deleteBtn = document.querySelector("#deleteBtn");

backBtn.addEventListener("click", () => {
    if (from) {
    if (from === "/") window.location.href = "/";
    else window.location.href = `/pages/${from}.html`;
    } else {
    window.location.href = "/";
    }
});
=======
document.addEventListener("DOMContentLoaded", function() {

    function getTickets(){
        return JSON.parse(localStorage.getItem("tickets")) || [];
    }
>>>>>>> e35a45890084ff1d807014d1c1e7c6e4dac544d9

    const params = new URLSearchParams(window.location.search);
    const ticketId = params.get("id");
    const from = params.get("from")

<<<<<<< HEAD
if (deleteBtn) {
    deleteBtn.addEventListener("click", async () => {
    const confirmed = confirm("Are you sure you want to delete this ticket?");
    if (!confirmed) return;
=======
    const backBtn = document.querySelector("#backBtn")
>>>>>>> e35a45890084ff1d807014d1c1e7c6e4dac544d9

    backBtn.addEventListener("click", () => {
        if (from) {
            if (from === "/")
                window.location.href = "/"
            else
                window.location.href = `/pages/${from}.html`
        } else {
            window.location.href = "/"
        }
<<<<<<< HEAD
    } catch (error) {
        alert(error.message || "Failed to delete ticket.");
=======
    })


    const tickets = getTickets();

    const ticket = tickets.find(t => String(t.id) === String(ticketId));

    if (!ticket) {
        document.querySelector(".form-card").innerHTML =
            "<h2>Ticket not found</h2>";
        return;
>>>>>>> e35a45890084ff1d807014d1c1e7c6e4dac544d9
    }

    document.getElementById("ticketId").textContent = "#" + ticket.id;
    document.getElementById("subject").textContent = ticket.subject || "-";
    document.getElementById("description").textContent = ticket.description || "-";
    document.getElementById("status").textContent = ticket.status || "-";
    document.getElementById("priority").textContent = ticket.priority || "-";

});