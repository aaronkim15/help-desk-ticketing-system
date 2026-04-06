import { authenticateUser } from "./userService.js";

document.addEventListener("DOMContentLoaded", () => {
const form = document.getElementById("login");
if (!form) return;

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!email || !password) {
    alert("Please fill in all fields.");
    return;
    }

    try {
    const userData = await authenticateUser(email, password);
    console.log("User data:", userData);

    if (!userData) {
        alert("Invalid email or password");
        return;
    }

    const token = userData.token;
    const userId = userData.user_id ?? userData.user?.user_id;
    const role = userData.role ?? userData.user?.role;

    if (!token || !userId) {
        alert("Login response invalid");
        console.log(userData);
        return;
    }

    localStorage.setItem("token", token);
    localStorage.setItem("user_id", userId);
    if (role) localStorage.setItem("role", role);

    window.location.href = "../index.html";
    } catch (error) {
    console.error(error);
    alert("Login failed");
    }
});
});