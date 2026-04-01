export function getUsers() {

    const allUsers = JSON.parse(localStorage.getItem("users"))
    
    return allUsers;
}

export function getUserById(id) {
    const allUsers = JSON.parse(localStorage.getItem("users"))

    return allUsers.find(user => user.id === id)
}

export async function authenticateUser(email, password) {
    const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    let data = await response.json();
    
    if (!response.ok) {
        data = null;
    }

    return data;
}

export async function createUser(name, email, password) {

    const response = await fetch('http://localhost:4000/signup', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    console.log(data)

    if (!response.ok) {
        return false
    }

    users.push({
        id: users.at(-1).id + 1,
        name: name,
        email: email,
        password: password,
    })

    localStorage.setItem("users", JSON.stringify(users));

    return true;
}

export function getValidToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 < Date.now()) {
            localStorage.removeItem('token');
            return null;
        }
        return payload;
    } catch {
        return null;
    }
}

const users = [
    {
        id: 3667,
        name: "John Doe",
        email: "johndoe@email.com",
        password: "johndoe123",
    },
    {
        id: 4567,
        name: "Chris Chan",
        email: "chrischan@email.com",
        password: "chrischan123",
    },
    {
        id: 3993,
        name: "Aaron Kim",
        email: "aaronkim@email.com",
        password: "aaronkim123",
    },
    {
        id: 4028,
        name: "Jasneet Singh",
        email: "jasneetsingh@email.com",
        password: "jasneetsingh123",
    },
]
if (!localStorage.getItem("users"))
    localStorage.setItem("users", JSON.stringify(users))