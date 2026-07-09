const express = require("express");
const movies = express.Router();

//import Routes condition
const {getMovies,postMovies,updateMovie,deleteMovie,} = require("../controllers/movieController");

movies.get("/movies", getMovies);
movies.post("/movies", postMovies);
movies.put("/movies/:movie_id", updateMovie);
movies.delete("/movies/:id", deleteMovie);

module.exports = movies;