import { useEffect, useState } from "react";
import axios from "axios"; 

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { Link, Navigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;//import the URL declared in environment variable 

function Admin() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  const role = localStorage.getItem("role");
  //get the role value from the localStorage and assign it to constant variable

  useEffect(() => {
    getMovies(); //call the both the function in useEffect to get the data before page renders
    getSeries();
  }, []);

  const getMovies = async () => {
    try {
      const res = await axios.get(`${API_URL}/movies`);
      setMovies(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getSeries = async () => {
    try {
      const res = await axios.get(`${API_URL}/series`);
      setSeries(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  //If role is not Admin it redirectes it to home page
  if (role !== "Admin") {
    return <Navigate to="/home" replace />;
  }

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">🎬 MovieHub Admin Dashboard</h1>
      <Row className="mb-4">
        <Col md={6}>
          <Card className="shadow text-center">
            <Card.Body>
              <h2>{movies.length}</h2>
              <h5>Total Movies</h5>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow text-center">
            <Card.Body>
              <h2>{series.length}</h2>
              <h5>Total Series</h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card className="shadow">
            <Card.Body>
              <Card.Title>🎥 Movies Management</Card.Title>
              <p>Add new movies or edit existing movies.</p>
              <Button as={Link} to="/movies" variant="success" className="me-2">Add Movie</Button>
              <Button as={Link} to="/edit" variant="warning">Edit Movies</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card className="shadow">
            <Card.Body>
              <Card.Title>📺 Series Management</Card.Title>
              <p>Add new series or edit existing series.</p>
              <Button as={Link} to="/addseries" variant="success" className="me-2">Add Series</Button>
              <Button as={Link} to="/editseries" variant="warning">Edit Series</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Admin;