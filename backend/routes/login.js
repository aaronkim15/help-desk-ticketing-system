const { loginUser } = require("../services/userService");

function loginRouter(req, res) {
if (req.url === "/login" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
    body += chunk.toString();
    });

    req.on("end", async () => {
    try {
        const { email, password } = JSON.parse(body);
        const user = await loginUser(email, password);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(user));
    } catch (error) {
        console.error("LOGIN ERROR:", error);

        if (error.message === "MISSING_REQUIRED_FIELDS") {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Missing required fields" }));
        return;
        }

        if (error.message === "INVALID_CREDENTIALS") {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Invalid email or password" }));
        return;
        }

        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "There was an error logging in the user" }));
    }
    });

    return true;
}

return false;
}

module.exports = loginRouter;