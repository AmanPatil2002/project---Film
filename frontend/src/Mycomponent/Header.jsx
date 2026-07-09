
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const role = localStorage.getItem("role");
  //get the role value from the localstorage and assign it to a constant variable

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/home" className="brand-logo">🎬 MovieHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" className="custom-navbar"/>
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            {/* checks if the role vlaue is "Admin" then display a navLink for admin  */}
            {role === "Admin" && (
              <Nav.Link as={Link} to="/admin" className="nav-item-custom">
                Admin Panel
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/home" className="nav-item-custom">Home</Nav.Link>
            <Nav.Link as={Link} to="/viewseries" className="nav-item-custom">Series</Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-item-custom">About Us</Nav.Link>
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" className="border-0 p-0 ms-3">
                <Image src="https://i.pravatar.cc/40" roundedCircle width={40} height={40}/>
              </Dropdown.Toggle>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;