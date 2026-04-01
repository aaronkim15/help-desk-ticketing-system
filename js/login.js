import { authenticateUser } from "./userService.js";


document.addEventListener("DOMContentLoaded", () => {
    initForm();
})

function initForm() {
    const form = document.getElementById("login")

    form.addEventListener("submit", async (e) => {
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
        const userData = await authenticateUser(email, password);

        if (!userData) {
            alert("Invalid email or password");
            return
        }
        console.log("User data:", userData)

        // TODO: replace with HTTP cookie header from backend
        localStorage.setItem("token", userData.token);
        localStorage.setItem('user_id', userData.user_id);
        localStorage.setItem('role', userData.role);
        window.location.href = "../index.html"
    })
}
