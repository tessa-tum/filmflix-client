import { Link } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import PropTypes from "prop-types";

export const NavigationBar = ({ user, onLoggedOut, setSearchItem }) => {
  return (
    <>
      {[false, "sm", "md", "lg", "xl", "xxl"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          bsPrefix="navbar"
          className="position-fixed top-0 start-0 end-0"
          style={{ zIndex: 1 }}
        >
          <Container fluid>
            <Navbar.Brand as={Link} to="/" onClick={() => setSearchItem("")}>
              filmflix
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  filmflix
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="flex-grow-1 justify-content-start">
                  {!user && (
                    <>
                      <Nav.Link as={Link} to={`/login`}>
                        Login
                      </Nav.Link>
                      <Nav.Link as={Link} to={`/signup`}>
                        Sign up
                      </Nav.Link>
                    </>
                  )}
                  {user && (
                    <>
                      <Nav.Link
                        as={Link}
                        to={`/`}
                        onClick={() => setSearchItem("")}
                      >
                        Home
                      </Nav.Link>
                      <Nav.Link as={Link} to={`/profile`}>
                        Profile
                      </Nav.Link>

                      <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

// validate with propTypes

NavigationBar.propTypes = {
  onLoggedOut: PropTypes.func.isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }),
  setSearchItem: PropTypes.func.isRequired,
};
