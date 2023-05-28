import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

// MovieCard function component

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card
      bsPrefix="card"
      className="h-100"
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      <Card.Img variant="top" src={movie.ImageURL} alt={movie.Title} />
      <Card.Body>
        <Card.Title bsPrefix="card-title">{movie.Title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

// validate with propTypes

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
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
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
