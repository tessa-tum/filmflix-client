import { Col, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import PropTypes from "prop-types";

export const UserFavMovies = ({ movies, user, token, updateUser }) => {
  const favoriteMovies = movies.filter((movie) =>
    user.FavoriteMovies.includes(movie._id)
  );

  // print favorite movies array

  const printFavoriteMovies =
    favoriteMovies.length === 0 ? (
      <Col className="mt-3">No favorite movies yet.</Col>
    ) : (
      favoriteMovies.map((movie) => (
        <Col
          className="mt-4"
          key={movie._id}
          xs={12}
          sm={9}
          md={6}
          lg={3}
          xl={3}
        >
          <MovieCard
            movie={movie}
            user={user}
            token={token}
            updateUser={updateUser}
          />
        </Col>
      ))
    );

  return (
    <>
      <h2>Favorite movies:</h2>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Row className="mb-4">{printFavoriteMovies}</Row>
      </div>
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
