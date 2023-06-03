import { Col, Row, Container } from "react-bootstrap";

export const Footer = () => {
  return (
    <footer className="footer position-relative-bottom">
      <Row>
        <Col className="text-center text-muted">
          <hr className="mb-3 mt-3"></hr>
          <p>Project © Tessa Tum</p>
          <p>
            Follow me on{" "}
            <a href="https://github.com/tessa-tum" style={{ color: "#ff8906" }}>
              Github
            </a>
          </p>
        </Col>
      </Row>
    </footer>
  );
};
