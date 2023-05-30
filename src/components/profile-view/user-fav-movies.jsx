import { Col, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import PropTypes from "prop-types";

export const UserFavMovies = ({ movies, user, token, updateUser }) => {
  const favoriteMovies = movies.filter((movie) =>
    user.FavoriteMovies.includes(movie._id)
  );

  return (
    <>
      <Row>
        <Col xs={12} className="mt-3 mb-5 text-center">
          <h3>Your favorite movies:</h3>
        </Col>
      </Row>

      <Row className="justify-content-center">
        {favoriteMovies.map((movie) => (
          <Col xs={12} md={6} lg={3} className="mb-4" key={movie._id}>
            <MovieCard
              movie={movie}
              user={user}
              token={token}
              updateUser={updateUser}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

// validate with propTypes

UserFavMovies.propTypes = {
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
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }).isRequired,
};
