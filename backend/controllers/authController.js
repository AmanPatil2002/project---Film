const db = require("../config/db"); //import database connection
const jwt = require("jsonwebtoken");//Imports the jsonwebtoken library.
require('dotenv').config();//import environment variables

const SECRET_KEY = process.env.SECRET_KEY

// Authencate user
const getAuth = (req, res) => {
  db.query("SELECT id,username,email FROM users", (err, result) => {
    if (err) {
    console.error(err);
    return res.status(500).json({message: err.message,}); 
    }
    res.json(result);
  });
};

//Check if already register are retyped if not then new register data is INSERT in table
const postAuth = (req, res) => {
  const { username, email, password } = req.body;
  db.query("SELECT * FROM users WHERE username=? OR email=?",[username, email],(err, result) => {
    if (err) {
      return res.status(500).json({message: err.message,});
    }
    if (result.length > 0) {//check if inserted data is already exist
      return res.status(400).json({message: "Username or Email already exists",});
    }
    const role="User";
    db.query("INSERT INTO users(username,email,password,role) VALUES(?,?,?,?)",[username, email, password, role],(err, result) => {
        if (err) {
          return res.status(500).json({message: err.message,});
        }
        //declare a variable to create a JWT token and data to encode in token
        const token = jwt.sign({id: result.insertId,username,role,},
          SECRET_KEY,//Secret password to sign token
          {
            expiresIn: "1h",//Token expires in 1 hour
          }
        );
        res.status(201).json({
          message: "User Registered Successfully",
          token,
          id: result.insertId,
          username,
          role,
        });
      }
    )}
  );
};

//checks the login input present in database or display error
const checkLogin = (req, res) => {
  const { username, password } = req.body;
  db.query("SELECT * FROM users WHERE username=?",[username],(err, result) => {
      if (err) {
        return res.status(500).json({message: err.message,});
      }
      //checks if no user found with that username
      if (result.length === 0) {
        return res.status(401).json({message: "Wrong Username",});
      }
      const user = result[0];
      //checks if password match stored password 
      if (password !== user.password) {
        return res.status(401).json({message: "Wrong Password",});
      }
      //declare a variable to create a JWT token and data to encode in token
      const token = jwt.sign({id: user.id,username: user.username,role: user.role,},
        SECRET_KEY,//Secret password to sign token
        {
          expiresIn: "1h",//Token expires in 1 hour
        }
      );
      res.json({
        message: "Login Successful",
        token,
        id: user.id,
        username: user.username,
        role: user.role,
      });
    }
  );
};


module.exports = { getAuth,postAuth,checkLogin };