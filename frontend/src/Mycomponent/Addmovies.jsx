import { useState } from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const API_URL = import.meta.env.VITE_API_URL

function AddMovies() {
  const [addedMovie,setAddedMovie]=useState([])

  const [moviename, setMovieName] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseyear, setReleaseYear] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");
  const [trailer, setTrailer] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  const newMovie = {movie_name:moviename,genre:genre,release_year:releaseyear,language:language,description:description,rating:rating,image:image,trailer:trailer}
  try {
    const res = await axios.post(`${API_URL}/movies`, newMovie);
    newMovie.movie_id = res.data.movie_id;//Add Movie ID to Object

    // Store only the inserted movie
    setAddedMovie([newMovie]);

    alert(`${moviename} Added Successfully`);//display a success message

    //after the Submission make the input value empty 
    setMovieName("");
    setGenre("");
    setReleaseYear("");
    setLanguage("");
    setDescription("");
    setRating("");
    setImage("");
    setTrailer("");
  } catch (err) {
    console.log(err);
    alert("Error adding movie");
  }
};

  
  return (
    <Container className="mt-4">
    <Row>
      <Col>
        <Card className="p-4 shadow" style={{width:500,}}>
          <h2 className="text-center mb-4">Add Movie</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Movie Name" value={moviename} onChange={(e) => setMovieName(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control  type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="number" placeholder="Release Year" value={releaseyear} onChange={(e) => setReleaseYear(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Language" value={language} onChange={(e) => setLanguage(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control as="textarea" placeholder="Movie Description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="number" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Trailer URL" value={trailer} onChange={(e) => setTrailer(e.target.value)} required/>
            </Form.Group>
            <Button variant="primary" type="submit">Add Movie</Button>
          </Form>
        </Card>
      </Col>
      <Col>
        {addedMovie.map((item) => (
          <Card className="p-3 shadow" style={{ width: "500px" }} key={item.movie_id}>
              <img src={item.image} alt={item.movie_name} style={{ height: "300px", objectFit: "cover" }}/>
              <Card.Body>
                  <Card.Title>{item.movie_name}</Card.Title>
                  <Card.Text>
                      <Row>
                        <Col xs={12}>
                          <strong>Discription :</strong> {item.description}
                        </Col>
                      </Row>
                      <Row>
                        <Col><strong>Genre :</strong> {item.genre}</Col>
                        <Col><strong>Release Year :</strong> {item.release_year}<br/></Col>
                      </Row>
                      <Row>
                        <Col><strong>Language :</strong> {item.language}</Col>
                        <Col><strong>Rating :</strong> {item.rating}</Col>          
                      </Row>
                  </Card.Text>
                  <hr/>
                  <a href={item.trailer} target="_blank" rel="noreferrer">Watch Trailer</a>
              </Card.Body>
          </Card>
          ))}
        </Col>
    </Row>
    </Container>
  );
}

export default AddMovies;