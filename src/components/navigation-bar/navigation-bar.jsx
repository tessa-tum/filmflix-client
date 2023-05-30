import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import PropTypes from "prop-types";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar
      bsPrefix="navbar"
      expand="lg"
      className="position-fixed top-0 start-0 end-0"
      style={{ zIndex: 1 }}
    >
      <Navbar.Brand as={Link} to="/" className="ms-3">
        filmflix
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="container-fluid">
          {!user && (
            <>
              <Nav.Link as={Link} to={`/login`} className="ms-lg-auto me-3">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to={`/signup`}>
                Sign up
              </Nav.Link>
            </>
          )}
          {user && (
            <>
              <Nav.Link as={Link} to={`/`} className="navbar-link">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to={`/profile`}>
                Profile
              </Nav.Link>
              <Nav.Link onClick={onLoggedOut} className="ms-lg-auto">
                Logout
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
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
};
