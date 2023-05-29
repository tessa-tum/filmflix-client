import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// MovieCard function component

export const MovieCard = ({ movie }) => {
  return (
    <Card
      bsPrefix="card"
      className="h-100"
      border="light"
      >
      <Card.Img variant="top" src={movie.ImageURL} alt={movie.Title} />
      <Card.Body style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <div>
        <Card.Title bsPrefix="card-title">{movie.Title}</Card.Title>
        <Card.Text bsPrefix="card-text">{movie.Director.Name}</Card.Text>
        </div>
        <div style={{marginTop: '12px'}}>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="secondary" className="w-100">See more</Button>
        </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

// validate with propTypes

MovieCard.propTypes = {
  movie: PropTypes.shape({
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
};
