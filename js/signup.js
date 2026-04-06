import { createUser } from "./userService.js";

document.addEventListener("DOMContentLoaded", () => {
const form = document.getElementById("signup");
if (!form) return;

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!name || !email || !password) {
    alert("Please fill in all fields.");
    return;
    }

    try {
    const result = await createUser(name, email, password);
    console.log("Signup result:", result);

    alert("Account created successfully. Please log in.");
    window.location.href = "./login.html";
    } catch (error) {
    console.error("Signup error:", error);
    alert(error.message || "Signup failed.");
    }
});
});