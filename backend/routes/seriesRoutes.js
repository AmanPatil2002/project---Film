const express = require("express");
const series = express.Router();

//import Routes condition
const { getSeries,postSeries,updateSeries,deleteSeries } = require("../controllers/seriesController");

series.get("/series", getSeries);
series.post("/series",postSeries);
series.put("/series/:series_id",updateSeries);
series.delete("/series/:id",deleteSeries)

module.exports = series;