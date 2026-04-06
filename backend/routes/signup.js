const { createUser } = require("../services/userService");

function signupRouter(req, res) {
  if (req.url === "/signup" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const { name, email, password } = JSON.parse(body);
        const user = await createUser(name, email, password);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "User created successfully",
            user,
          })
        );
      } catch (error) {
        console.error("SIGNUP ERROR:", error);

        if (error.message === "MISSING_REQUIRED_FIELDS") {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Missing required fields" }));
          return;
        }

        if (error.message === "EMAIL_ALREADY_EXISTS") {
          res.writeHead(409, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Email already exists" }));
          return;
        }

        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "There was an error signing up the user",
            error: error.message,
          })
        );
      }
    });

    return true;
  }

  return false;
}

module.exports = signupRouter;