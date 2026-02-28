import { authenticateUser } from "./userService.js";


document.addEventListener("DOMContentLoaded", () => {
    initForm();
})

function initForm() {
    const form = document.getElementById("login")

    form.addEventListener("submit", (e) => {
        e.preventDefault()

        const email = form.email.value.trim();
        const password = form.password.value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !password) {
            alert("Please fill in all fields.")
            return
        }

        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // TODO: validate password
        if (!authenticateUser(email, password)) {
            alert("Invalid email or password");
            return
        }


        // TODO: replace with HTTP cookie header from backend
        localStorage.setItem("token", "mock-token")
        window.location.href = "../index.html"
    })
}
