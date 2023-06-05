import { Col, Row } from "react-bootstrap";
import { UserInfo } from "./user-info";
import { UserUpdate } from "./user-update";
import { UserFavMovies } from "./user-fav-movies";
import { UserDelete } from "./user-delete";
import PropTypes from "prop-types";

export const ProfileView = ({
  user,
  token,
  movies,
  onLoggedOut,
  updateUser,
}) => {
  return (
    <>
      <Row className="mt-5">
        <Col xs={12} sm={11} md={6} lg={4} xl={4}>
          <UserInfo user={user} />
        </Col>
      </Row>

      <Row className="mt-5">
        <Col xs={12} sm={10} md={6} lg={5} xl={4}>
          <UserUpdate user={user} updateUser={updateUser} token={token} />
        </Col>
      </Row>

      <Row className="mt-5">
        <Col xs={12} sm={11} md={6} lg={4} xl={4}>
          <UserDelete
          user={user}
          token={token}
          onLoggedOut={onLoggedOut}
          />
        </Col>
      </Row>

      <Row className="mt-5 mb-5">
        <Col>
          <UserFavMovies
            movies={movies}
            user={user}
            token={token}
            updateUser={updateUser}
          />
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
  token: PropTypes.string.isRequired,
  onLoggedOut: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }).isRequired,
};
