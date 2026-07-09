const jwt = require("jsonwebtoken");//import JWT to generate and verify the tokens
require('dotenv').config();// import environment varibles from (.env)

const SECRET_KEY = process.env.SECRET_KEY

// Middleware function
// Middleware runs BEFORE the route handler
function authenticateToken(req, res, next) {
  //declare a constant variable for authorization header containing request of specific header containing "Bearer <token>"
  const authHeader = req.headers.authorization;

  //declare a constant Variable to store the extracted token and check if its exist and Splits "Bearer abc123" into ["Bearer", "abc123"]
  const token = authHeader && authHeader.split(" ")[1]; 
 
  //Checks if token exist or not
  if (!token) {
    return res.sendStatus(401);
  }

// jwt.verify: Built-in method to check if token is valid
// token: The JWT to verify
// SECRET_KEY: The secret password used to decode the token
// (err, user): Callback function parameters:
// err: Error if verification fails
// user: Decoded user data if successful
  jwt.verify(token,SECRET_KEY,(err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;//Attach decoded user data to request object
      next();//Call next middleware/route handler
    }
  );
}

module.exports = authenticateToken;//export the authentication