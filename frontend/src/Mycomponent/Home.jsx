import { useState, useEffect } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel';

const API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const [show, setShow] = useState([]);
  const showMovie = async () => {
    try {
      const res = await axios.get(`${API_URL}/movies`);
      setShow(res.data);// get the response data in setShow
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    showMovie();//call the function in useEffect to get the data before page renders
  }, []);

  return (
    <Container className="mt-1">
      <Carousel fade style={{marginLeft:-70,marginRight:-75}}>
        {show.map((carousel) => (
          <Carousel.Item key={carousel.movie_id}>
            <img src={carousel.image} alt={carousel.movie_name} style={{margin:-10,width:"100%",height:"60%",position:"relative"}}/>
            <Carousel.Caption>
              <h3>{carousel.movie_name}</h3>
              <p>{carousel.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <Row>
        <h3>Movies</h3>
        {show.map((card) => (
          <Col md={6} lg={4} sm={6} xs={12} className="mb-4" key={card.movie_id}>
            <Card className="h-100 shadow" style={{ position: "relative", paddingBottom: "60px" }}>
              <Card.Img variant="top" src={card.image} alt={card.movie_name} style={{ height: "300px", objectFit:"contain",backgroundColor:"black" }}/>
              <Card.Body>
                <Card.Title>{card.movie_name}</Card.Title>
                <Card.Text>
                <Row>
                    <Col xs={12}><strong>Description : </strong>{card.description}</Col>
                </Row>
                <Row>
                    <Col><strong>Genre:</strong> {card.genre}</Col>
                    <Col><strong>Release Year:</strong> {card.release_year}</Col>
                </Row>
                <Row>
                    <Col><strong>Language:</strong> {card.language}</Col>
                    <Col><strong>Rating:</strong> {card.rating} ⭐</Col>
                </Row>  
                </Card.Text>
                <div style={{position: "absolute",bottom: "15px",left: "15px",right: "15px",}}>
                    <a href={card.trailer} target="_blank" rel="noreferrer" className="btn btn-danger w-100">Watch Trailer</a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;