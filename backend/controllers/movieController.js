const db = require("../config/db");

// Controller function to fetch all movies
const getMovies = (req, res) => {
  db.query("SELECT * FROM movies", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// Controller function to add a new movie
const postMovies = (req, res) => {
    const {movie_name, genre, release_year, language, description, rating, image, trailer} = req.body // Extract movie data sent from frontend
    const sql = `INSERT INTO movies(movie_name, genre, release_year, language, description, rating, image, trailer) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
     db.query(sql ,[movie_name, genre, release_year, language, description, rating, image, trailer],(err,result)=>{
        if(err){
            return res.status(500).json(err);
        }
        res.json({
            message:"Data added",
            movie_id: result.insertId,
            movie_name,genre,release_year,language,description,rating,image,trailer
    });
    })
};

// Controller function to update an existing movie
const updateMovie = (req, res) => {
  const { movie_id } = req.params;
   const {movie_name, genre, release_year, language, description, rating, image, trailer} = req.body
   const sql = `UPDATE movies SET movie_name=?,genre=?, release_year=?, language=?, description=?, rating=?, image=?, trailer=? WHERE movie_id=?`;
  db.query(sql,[movie_name, genre, release_year, language, description, rating, image, trailer,movie_id],(err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json({message: "Movie Updated Successfully",});
    }
  );
};

// Controller function to delete a movie
const deleteMovie = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM movies WHERE movie_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({message: "Movie Deleted Successfully",});
  });
};

module.exports = {getMovies,postMovies,updateMovie,deleteMovie,};