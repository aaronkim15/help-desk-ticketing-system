const API_BASE = "http://localhost:4000";

export async function getUserById(id) {
const response = await fetch(`${API_BASE}/users/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
});

if (!response.ok) return null;
return response.json();
}

export async function authenticateUser(email, password) {
const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
});

const data = await response.json();
if (!response.ok) return null;
return data;
}

export async function createUser(name, email, password) {
const response = await fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
});

const data = await response.json();
if (!response.ok) {
    throw new Error(data.message || "Failed to sign up");
}

return data;
}

export function getValidToken() {
const token = localStorage.getItem("token");
if (!token) return null;

try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
    return null;
    }
    return payload;
} catch {
    return null;
}
}