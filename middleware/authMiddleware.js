const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  let token;

  // Bisa dari header Authorization atau query (optional)
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    // Kalau di browser request halaman UI
    if (req.accepts("html")) return res.redirect("/login");
    return res.status(401).json({ message: "Token required" });
  }

  jwt.verify(token, "secret123", (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

module.exports = authMiddleware;
