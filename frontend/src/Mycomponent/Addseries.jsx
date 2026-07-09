import { useState } from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const API_URL = import.meta.env.VITE_API_URL; 
//import.meta is a special object available in ES Modules.Think of it as information about the current module (file).
//import.meta.env => It gives information about the environment file .env (variables)

function Addseries() {
  const [addedSeries, setAddedSeries] = useState([]);

  const [seriesname, setSeriesName] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseyear, setReleaseYear] = useState("");
  const [season, setSeason] = useState("");
  const [episode, setEpisode] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");
  const [trailer, setTrailer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSeries = {
      series_name: seriesname,
      genre: genre,
      release_year: releaseyear,
      season: season,
      episode: episode,
      description: description,
      rating: rating,
      image: image,
      trailer: trailer,
    };
    try {
      const res = await axios.post(`${API_URL}/series`, newSeries);
      newSeries.series_id = res.data.series_id;// ADD series ID to object 

      // Store only the inserted series
      setAddedSeries([newSeries]);

      alert(`${seriesname} Added Successfully`);// display a success message

      //after the Submission make the input value empty 
      setSeriesName("");
      setGenre("");
      setReleaseYear("");
      setSeason("");
      setEpisode("");
      setDescription("");
      setRating("");
      setImage("");
      setTrailer("");
    } catch (err) {
      console.log(err);
      alert("Error adding series");
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Card className="p-4 shadow" style={{ width: 500 }}>
            <h2 className="text-center mb-4">Add Series</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Series Name"
                  value={seriesname}
                  onChange={(e) => setSeriesName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Release Year"
                  value={releaseyear}
                  onChange={(e) => setReleaseYear(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Seasons"
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Episode"
                  value={episode}
                  onChange={(e) => setEpisode(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  placeholder="Movie Description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Image URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Trailer URL"
                  value={trailer}
                  onChange={(e) => setTrailer(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Add Series
              </Button>
            </Form>
          </Card>
        </Col>
        <Col>
          {addedSeries.map((item) => (
            <Card
              className="p-3 shadow"
              style={{ width: "500px" }}
              key={item.series_id}
            >
              <img
                src={item.image}
                alt={item.series_name}
                style={{ height: "300px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{item.series_name}</Card.Title>
                <Card.Text>
                  <Row>
                    <Col xs={12}>
                      <strong>Discription :</strong> {item.description}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <strong>Genre :</strong> {item.genre}
                    </Col>
                    <Col>
                      <strong>Release Year :</strong> {item.release_year}
                      <br />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <strong>Seasons :</strong> {item.season}
                    </Col>
                    <Col>
                      <strong>Episode :</strong> {item.episode}
                      <br />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <strong>Rating :</strong> {item.rating}
                    </Col>
                  </Row>
                </Card.Text>
                <hr />
                <a href={item.trailer} target="_blank" rel="noreferrer">
                  Watch Trailer
                </a>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default Addseries;
