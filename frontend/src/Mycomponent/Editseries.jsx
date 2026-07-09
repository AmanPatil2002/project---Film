import { useState, useEffect } from "react";
import axios from "axios";
import "./Editmovies.css"
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Editseries() {
  const [series, setSeries] = useState([]);

  const [seriesId, setSeriesId] = useState("");
  const [seriesName, setSeriesName] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [season, setSeason] = useState("");
  const [episode,setEpisode] =useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");
  const [trailer, setTrailer] = useState("");

  const [selectedTrailer, setSelectedTrailer] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // Get all series
  const getSeries = async () => {
    try {
      const res = await axios.get(`${API_URL}/series`);
      setSeries(res.data);
    } catch (err) {
      console.log(err);
    }
  };

 useEffect(() => {
     getSeries();// call the function in useEffect to get the data before page renders
   }, []);

  // when the editSeries is clicked the the data from the selected button is placed in the input field 
  const editSeries = (item) => {
    setSeriesId(item.series_id);
    setSeriesName(item.series_name);
    setGenre(item.genre);
    setReleaseYear(item.release_year);
    setSeason(item.season),
    setEpisode(item.episode),
    setDescription(item.description);
    setRating(item.rating);
    setImage(item.image);
    setTrailer(item.trailer);
  };

  // the data already filled by the edit button is present in the input field as we can make changes to it and to save this changes by clicking update button 
  //changing the data from the new one 
  const updateSeries = async (e) => {
    e.preventDefault();
    const updatedSeries = {series_name: seriesName,genre,release_year: releaseYear,season,episode,description,rating,image,trailer,};
    try {
      await axios.put(`${API_URL}/series/${seriesId}`,updatedSeries);
      alert("Series Updated Successfully");//display success message

      getSeries();//get the data from the series

      //after the edit submission make the input value empty 
      setSeriesId("");
      setSeriesName("");
      setGenre("");
      setReleaseYear("");
      setSeason(""),
      setEpisode(""),
      setDescription("");
      setRating("");
      setImage("");
      setTrailer("");
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };
  //delete
  const deleteSeries = async (id) => {
  try {
    await axios.delete(`${API_URL}/series/${id}`);

    alert("Series Deleted Successfully");
    getSeries();

    if (seriesId === id) {// if the selected id is equal to a specific movie Id then set the input field empty 
      setSeriesId("");
      setSeriesName("");
      setGenre("");
      setReleaseYear("");
      setSeason(""),
      setEpisode(""),
      setDescription("");
      setRating("");
      setImage("");
      setTrailer("");
    }
  } catch (err) {
    console.log(err);
    alert("Delete Failed");
  }
};

  //used chatGPT----------------------------------------------
  const getEmbedUrl = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };
  //used chatGPT----------------------------------------------


  return (
    <Container className="mt-4">
    <Row>
        <Col xs={4}>
          <Form onSubmit={updateSeries}>
            <h2 className="text-center mb-4">Edit Series</h2>
            <Form.Group className="mb-3">
              <Form.Control value={seriesName} placeholder="Series Name" onChange={(e) => setSeriesName(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control value={genre} placeholder="Genre" onChange={(e) => setGenre(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control value={releaseYear} placeholder="Release Year" onChange={(e) => setReleaseYear(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control value={season} placeholder="Season" onChange={(e) => setSeason(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control value={episode} placeholder="Episode" onChange={(e) => setEpisode(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control as="textarea" rows={3} value={description} placeholder="Description of Movie in Brief" onChange={(e) => setDescription(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control value={rating} placeholder="Rating" onChange={(e) => setRating(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control value={image} placeholder="Image URL" onChange={(e) => setImage(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control value={trailer} placeholder="Video URL" onChange={(e) => setTrailer(e.target.value)} required/>
            </Form.Group>
            <Button variant="warning" type="submit">Update Series</Button>
          </Form>
        </Col>
        <Col xs={8}>
          <div className="shadow-lg rounded-4 border bg-white" style={{ maxHeight: "650px",width:980, overflowY: "auto" }}>
            <Table responsive hover className="align-middle mb-0">
              <thead style={{position:"sticky",top: 0,zIndex: 10,background: "#212529",color: "white"}}>
                <tr>
                  <th>Series</th>
                  <th>Details</th>
                  <th>Trailer</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {series.map((item) => (
                  <tr key={item.series_id}>
                     <td style={{ maxWidth: "150px" }}>
                      <div className="movie-card" style={{backgroundImage: `url(${item.image})`,}}>
                        <div className="movie-overlay">
                          <p><strong>Genre:</strong> {item.genre}</p>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ maxWidth: "25px" }}>
                      <div>
                        <h6 className="fw-bold mb-1">{item.series_name}</h6>
                        <small className="text-muted">Released: {item.release_year}</small><br/>
                        <h6><small className="text-muted">Seasons: {item.season}</small><br/><small className="text-muted">Episode: {item.episode}</small><br/></h6>
                        <span className="badge bg-secondary px-3 py-2">⭐ {item.rating}</span><br/><br/>
                        <Button variant="outline-danger" size="sm" onClick={() => setSelectedTrailer(selectedTrailer === item.series_id ? null : item.series_id)}>
                          {selectedTrailer === item.series_id ? "❌ Close" : "🎬 Trailer"}
                        </Button>
                      </div>
                    </td>
                    <td style={{ maxWidth: "150px" }}>
                      <div className="movie-trailer">
                        {selectedTrailer === item.series_id && (
                        <iframe width="320" height="200" style={{borderRadius:"15px"}} src={getEmbedUrl(item.trailer)} title={item.series_name} frameBorder="0" allowFullScreen/>
                        )}
                      </div>
                    </td>
                    <td style={{ maxWidth: "5px" }}>
                      <Button variant="warning" className="fw-semibold" onClick={() => editSeries(item)}>✏️ Edit</Button>
                      <br/><br/>
                      <Button variant="danger" className="fw-semibold" onClick={() => deleteSeries(item.series_id)}>❌ Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
      </Col>
    </Row>
    </Container>
  );
}

export default Editseries;