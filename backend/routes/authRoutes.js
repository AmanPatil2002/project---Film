const express = require("express");
const router = express.Router();

// Import JWT authentication middleware
const authenticateToken = require("../middleware/authenticate");

//import Routes condition
const { getAuth,postAuth,checkLogin} = require("../controllers/authController");

//handle the Post request through the URL "/Register" and the function to be exicuted
router.post("/Register", postAuth);

//handle the Get request through the URL "/login" and  check the authencation using tokens & the function to be exicuted
router.get("/login", authenticateToken, getAuth);

//handle the Post request through the URL "/login" and the function to be exicuted
router.post("/login", checkLogin); 

module.exports = router;