import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-3">
      {" "}
      <Container>
        <Row>
          <Col className="text-center">
            {" "}
            <p>
              &copy; 2021 - Pizzería Mamma Mia! - Todos los derechos reservados
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
