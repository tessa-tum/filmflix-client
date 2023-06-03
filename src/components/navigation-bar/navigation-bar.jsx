import { Link } from "react-router-dom";
import {
  Container,
  Nav,
  Navbar,
  Form,
  FormControl,
  Offcanvas,
  NavDropdown,
} from "react-bootstrap";
import PropTypes from "prop-types";

export const NavigationBar = ({
  user,
  onLoggedOut,
  searchItem,
  setSearchItem,
}) => {
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
                <Nav className="justify-content-end flex-grow-1 pe-3">
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

                      <NavDropdown
                        title="Logout"
                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                      >
                        <NavDropdown.Item onClick={onLoggedOut}>
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>

                      {/* enable search input bar */}
                      {user && (
                        <>
                          <Form className="d-flex">
                            <FormControl
                              type="text"
                              placeholder="Search by title"
                              value={searchItem}
                              onChange={(e) => setSearchItem(e.target.value)}
                            />
                          </Form>
                        </>
                      )}
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
  searchItem: PropTypes.string.isRequired,
  setSearchItem: PropTypes.func.isRequired,
};
