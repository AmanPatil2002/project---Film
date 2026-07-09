const db = require("../config/db");

// Controller function to fetch all series
const getSeries = (req, res) => {
  db.query("SELECT * FROM series", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// Controller function to add a new series
const postSeries = (req, res) => {
  const {series_name,genre,release_year,season,episode,description,rating,image,trailer,} = req.body;
  const sql = `INSERT INTO series (series_name, genre, release_year, season, episode, description, rating, image, trailer) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql,[series_name,genre,release_year,season,episode,description,rating,image,trailer,],(err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({
        message: "Series Added Successfully",
        series_id: result.insertId,
        series_name,genre,release_year,season,episode,description,rating,image,trailer
      });
    });
};

// Controller function to update an existing series
const updateSeries = (req, res) => {
  const { series_id } = req.params;
  const {series_name,genre,release_year,season,episode,description,rating,image,trailer,} = req.body;
  const sql = `UPDATE series SET series_name=?,genre=?,release_year=?,season=?,episode=?,description=?,rating=?,image=?,trailer=? WHERE series_id=?`;
  db.query(sql,[series_name,genre,release_year,season,episode,description,rating,image,trailer,series_id,],(err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({message: "Series Updated Successfully",});
    });
};

// Controller function to delete a series
const deleteSeries = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM series WHERE series_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({message: "Series Deleted Successfully",});
  });
};

module.exports = {getSeries,postSeries,updateSeries,deleteSeries,};