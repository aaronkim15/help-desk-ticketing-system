const { authenticateUser } = require("../services/userService.js");

function loginRouter(req, res) {
    console.log("login router called!")
    if (req.url === "/login" && req.method === "POST") {
        let body = "";
        req.on ("data", (chunk) => {
            // Process incoming data chunk (e.g., parse JSON, validate input)
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                console.log(body)
                const { email, password } = JSON.parse(body);

                console.log('calling authenticateUser');
                const result = await authenticateUser(email, password);
                console.log('authenticateUser returned', result);

                if (result) {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "User logged in successfully", user_id: result.user_id }));
                }

            } catch (error) {
                console.log("My error:", error.message)
                if (error.message === "INVALID_CREDENTIALS" || error.message === "USER_NOT_FOUND") {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "Invalid email or password" }));
                } else {
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "There was an error logging in the user" }));
                }
            }
        });
        return true; // route handled
    }
    return false;
}

module.exports = {loginRouter};