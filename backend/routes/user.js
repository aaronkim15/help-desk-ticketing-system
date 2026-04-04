const { getUserById } = require( "../services/userService.js");

function userRouter(req, res) {

    const userMatch = req.url.match(/^\/users\/(\d+)$/);

    console.log("userMatch:", userMatch, req.url)

    if (userMatch && req.method === "GET") {
        const userId = parseInt(userMatch[1], 10);

        (async () => {
            try {
                const {name, email, role} = await getUserById(userId);
                console.log("HERE NOW", name, email, role)
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ user_id: userId, name, email, role }));
            } catch (error) {

                if (error.message === "USER_NOT_FOUND") {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "User not found" }));
                } else {
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Internal Server Error" }));
                }
            }
        })();
        return true;
    }

    return false;
}

module.exports = { userRouter };