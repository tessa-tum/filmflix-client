import { Card, Col, Row, Button } from "react-bootstrap";
import { UserInfo } from "./user-info";
import { UserUpdate } from "./user-update";
import { UserFavMovies } from "./user-fav-movies";
import PropTypes from "prop-types";

export const ProfileView = ({
  user,
  token,
  movies,
  onLoggedOut,
  updateUser,
}) => {
  const deleteAccount = () => {
    fetch(`https://filmflix-api.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.ok) {
          alert("Your account has been deleted. Good Bye!");
          onLoggedOut();
        } else {
          alert("Could not delete account");
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <>
      <Row className="justify-content-center">
        <Col className="mt-5">
          <h1 className="text-center">
            Your <span style={{ color: "#ff8906" }}>profile</span>
          </h1>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={7}>
          <Card
            border="light"
            className="w-100 mt-5 mb-3 text-center"
            bsPrefix="profile-card"
          >
            <Card.Body>
              <UserInfo user={user} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={7}>
          <Card
            border="light"
            className="w-100 mt-4 mb-3 text-center"
            bsPrefix="profile-card"
          >
            <Card.Body>
              <UserUpdate user={user} updateUser={updateUser} token={token} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={7}>
          <Card
            border="light"
            className=" w-100 mt-4 mb-5 text-center"
            bsPrefix="profile-card"
          >
            <Card.Body className="mt-3">
              <p>You want to delete your account? Sad to see you go ...</p>
              <Button
                className="mb-3 mt-2 btn-secondary"
                onClick={() => {
                  if (confirm("Are you sure?")) {
                    deleteAccount();
                  }
                }}
              >
                Delete account
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col>
          <Card style={{ border: "none" }}>
            <Card.Body>
              <UserFavMovies
                movies={movies}
                user={user}
                token={token}
                updateUser={updateUser}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

// validate with propTypes

ProfileView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      ImageURL: PropTypes.string.isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
      }).isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
      }),
    }).isRequired
  ),
  onLoggedOut: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }).isRequired,
};
