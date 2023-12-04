
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.token;

  if (token) {
    try {
      
      jwt.verify(token, process.env.accesstoken);
      next(); 
    } catch (error) {
      res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized - Token not provided" });
  }
};

module.exports = { auth };
