import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 text-white mt-16">
      <Container>
        <Row className="py-1">
          <Col lg={12} md={6} className="mb-4 ">
            <h2 className="text-warning fw-bold mb-3">🎬 MovieHub</h2>
            <p className="text-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium doloribus accusamus perferendis natus possimus, quod deleniti ullam cumque unde eaque!</p>
            <div className="d-flex gap-3 mt-3 fs-4">
              <a href="#" className="text-light hover:text-warning transition"><FaFacebook /></a>
              <a href="#" className="text-light hover:text-warning transition"><FaInstagram /></a>
              <a href="#" className="text-light hover:text-warning transition"><FaTwitter /></a>
              <a href="#" className="text-light hover:text-warning transition"><FaYoutube /></a>
            </div>
          </Col>
          <Col lg={6} md={1} className="mb-4">
            <h4 className="text-warning fw-bold mb-3">Quick Links</h4>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/home" className="text-light text-decoration-none hover:text-warning">Home</a>
              </li>
              <li className="mb-2">
                <a href="/series" className="text-light text-decoration-none hover:text-warning">Series</a>
              </li>
              <li className="mb-2">
                <a href="/about" className="text-light text-decoration-none hover:text-warning">About Us</a>
              </li>
            </ul>
          </Col>
          <Col lg={6} md={6}>
            <h4 className="text-warning fw-bold mb-3">Contact Us</h4>
            <p className="mb-2">📧 support@moviehub.com</p>
            <p className="mb-2">📞 +91 XXXX XXXX</p>
            <p>📍 Gadhinglaj, Maharashtra, India</p>
          </Col>
        </Row>
        <hr className="border-secondary" />
        <div className="text-center py-3">
          <p className="mb-1">© 2026 
            <span className="fw-bold text-warning">MovieHub</span>. 
            All Rights Reserved.
          </p>
          <small className="text-secondary">Designed using React, Bootstrap & Tailwind CSS</small>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;