/**
 * The main JavaScript file for index.html. This file is responsible for handling
 * the interactivity of the repeated layout components, such as the navigation bar
 * and the top header.
 * 
 * It also controls the main content, as well as whether a user is logged in or not.
 */


document.addEventListener("DOMContentLoaded", () => {
    initSearchBar();
})


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
        const tickets = ["Fix bug", "Add feature", "Update documentation"];
        const filteredTickets = tickets.filter(ticket => ticket.toLowerCase().includes(query));
                
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
                listItem.textContent = ticket;

                // TODO: add eventListener to redirect to ticket detail page
                
                resultsUI.appendChild(listItem)
            }
        }
    })
}