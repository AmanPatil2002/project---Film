const express = require("express");//import the express 
const cors = require("cors");//import cors to communicate between (frontend & backend)
require('dotenv').config();//import environment variable from (.env)

//import Routes
const movieRoutes = require("./routes/movieRoutes");
const seriesRoutes = require("./routes/seriesRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();// Create an Express application instance

app.use(cors());
app.use(express.json());// Parse JSON bodies

const PORT = process.env.PORT || 5000;//set the port number to run the server

// Routes
app.use("/auth", authRoutes);
app.use("/", movieRoutes);
app.use("/", seriesRoutes);

app.listen(PORT, ()=>{
    console.log(`Server Running on Port ${PORT}`);
});
