import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel';
const API_URL = import.meta.env.VITE_API_URL;

function Series() {
  const [show, setShow] = useState([]);
  const showSeries = async () => {
    try {
      const res = await axios.get(`${API_URL}/series`);
      setShow(res.data);// get the response data in setShow 
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    showSeries();//call the function in useEffect to get the data before page renders
  }, []);

  return (
    <Container className="mt-1">
      <Carousel fade style={{marginLeft:-70,marginRight:-75}}>
        {show.map((carousel) => (
          <Carousel.Item key={carousel.series_id}>
            <img src={carousel.image} alt={carousel.series_name} style={{margin:-10,width:"100%",height:"60%"}}/>
            <Carousel.Caption>
              <h3>{carousel.series_name}</h3>
              <p>{carousel.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <Row>
        <h3>Series</h3>
        {show.map((card) => (
          <Col md={6} lg={4} sm={6} xs={12} className="mb-4" key={card.series_id}>
            <Card className="h-100 shadow">
              <Card.Img variant="top" src={card.image} alt={card.series_name} style={{height: "300px",objectFit: "contain",backgroundColor: "black",}}/>
                <Card.Body>
                  <Card.Title>{card.series_name}</Card.Title>
                  <p><strong>Description:</strong> {card.description}</p>
                  <Row>
                    <Col><strong>Seasons:</strong> {card.season}</Col>
                    <Col><strong>Episodes:</strong> {card.episode}</Col>
                  </Row>
                  <Row className="mt-2">
                    <Col><strong>Genre:</strong> {card.genre}</Col>
                    <Col><strong>Year:</strong> {card.release_year}</Col>
                  </Row>
                  <p className="mt-2"><strong>Rating:</strong> ⭐ {card.rating}</p>
                </Card.Body>
                <Card.Footer className="bg-white border-0">
                  <a href={card.trailer} target="_blank" rel="noreferrer" className="btn btn-danger w-100">Watch Trailer</a>
                </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Series;