const { signup } = require("../services/userService.js");


function signupRouter(req, res) {

    if (req.url === "/signup" && req.method === "POST") {
      // Handle user signup logic here
  
      let body = "";
      req.on ("data", (chunk) => {
        // Process incoming data chunk (e.g., parse JSON, validate input)
          body += chunk.toString();
      });
      req.on('end', async () => {


        try {

          const { name, email, password } = JSON.parse(body);

          // Call the signup function from userService
          const result = await signup(name, email, password);

          if (result) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "User signed up successfully", user_id: result.user_id }));
          }


        } catch (error) {

          if (error.message === "USER_ALREADY_EXISTS") {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: "A user with this email already exists" }));
          } 
          else {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "There was an error signing up the user" }));
          }
        }
      });
      return true; // route handled
    }
    return false; // not matching route - not handled
}

module.exports = { signupRouter };