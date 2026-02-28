/**
 * The main JavaScript file for index.html. This file is responsible for handling
 * the interactivity of the repeated layout components, such as the navigation bar
 * and the top header.
 * 
 * It also controls the main content, as well as whether a user is logged in or not.
 */

import { getUserTickets } from "./ticketService.js";


document.addEventListener("DOMContentLoaded", () => {
    verifyLogin();
    initNavBar();
    initSearchBar();
    initLogoutButton();
})

function verifyLogin() {
    // TODO: replace with cookie header check
    const token = localStorage.getItem("token")
    if (!token) {
        window.location.replace("../pages/login.html")
    }
}

function initSearchBar() {
    const searchInput = document.querySelector(".search-input");
    searchInput.addEventListener("input", (event) => {
        const query = event.target.value.toLowerCase();
        const resultsUI = document.querySelector(".search-results")
        
        
        if (query.length === 0) {
            resultsUI.classList.add("hidden")
        }
        else {
            resultsUI.classList.remove("hidden")
        }

        // TODO: replace with GET request to backend to fetch matching tickets
        const tickets = getUserTickets(4567, "customer");
        const filteredTickets = tickets.filter(ticket => ticket.subject.toLowerCase().includes(query));
                
        if (filteredTickets.length === 0) {
            resultsUI.replaceChildren()

            const listItem = document.createElement("li")
            resultsUI.appendChild(listItem)
            listItem.textContent = "No results found"
            
        }
        
        else {
            resultsUI.replaceChildren()
            
            for (let ticket of filteredTickets) {
                const listItem = document.createElement("li")
                listItem.textContent = ticket.subject;

                // TODO: add eventListener to redirect to ticket detail page
                
                resultsUI.appendChild(listItem)
            }
        }
    })
}

function initLogoutButton() {
    const logoutButton = document.getElementById("logout");

    logoutButton.addEventListener("click", (e) => {
        // TODO: replace with proper logout
        localStorage.removeItem("token");
        window.location.replace("../pages/login.html")
    })
}

function initNavBar() {

    // TODO: replace with role check from user profile (via GET request)
    const isAdmin = false

    if (!isAdmin) {
        const allTicketsNav = document.getElementById("all-tickets")
        allTicketsNav.parentNode.removeChild(allTicketsNav)
    }
}