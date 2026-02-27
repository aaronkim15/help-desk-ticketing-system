export function getUsers() {
    return users;
}

export function getUserById(id) {
    return users.find(user => user.id === id)
}

export function authenticateUser(email, password) {
    // TODO: move logic to backend
    const user = users.find(user => user.email === email)

    if (!user)
        return false;

    return user.password === password;
}

export function createUser(name, email, password) {
    users.push({
        id: users.at(-1).id + 1,
        name: name,
        email: email,
        password: password,
    })
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