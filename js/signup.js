document.addEventListener("DOMContentLoaded", () => {
    initForm();
})

function initForm() {
    const form = document.getElementById("signup")

    form.addEventListener("submit", (e) => {
        e.preventDefault()

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !password) {
            alert("Please fill in all fields.")
            return
        }

        if (!emailRegex.test(email)) {
          alert("Please enter a valid email address.");
          return;
        }

        if (password.length < 6) {
            alert ("Password must be at least 6 characters long.")
            return;
        }

        // TODO: send POST request to create user account


        // TODO: replace with HTTP cookie header from backend
        localStorage.setItem("token", "mock-token")
        window.location.href = "../pages/index.html"
    })
}
