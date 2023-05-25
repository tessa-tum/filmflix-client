import PropTypes from "prop-types";
import { Button, Row, Col, Image } from "react-bootstrap";

// MovieView function component

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Row className="d-flex flex-row-reverse mt-5">
      <Col xs={12} sm={12} md={6} lg={4} className="mb-5">
        <Image
          src={movie.ImageURL}
          alt={`${movie.Title} Poster`}
          className="fluid w-100 rounded square border border-white text-end"
        />
      </Col>

      <Col className="d-flex flex-column me-5">
        <h2 className="my-0">
          <span>{movie.Title}</span>
        </h2>

        <h4 className="mt-2 mb-5 text-left">
          <span>Director: </span>
          <span>{movie.Director.Name}</span>
        </h4>

        <h6 className="mb-2">What happens?</h6>
        <div className="mt-2">
          <span>{movie.Description}</span>
        </div>

        <h6 className="mt-4 mb-2">Genre: {movie.Genre.Name}</h6>
        <div className="mt-2">
          <span>{movie.Genre.Description}</span>
        </div>

        <h6 className="mt-4 mb-2">Director Bio:</h6>
        <div className="mt-2">
          <span>{movie.Director.Bio}</span>
        </div>

        <div className="mt-5 text-mb-md-4">
          <Button
            bsPrefix="btn"
            type="button"
            onClick={() => {
              onBackClick();
            }}
          >
            Go back
          </Button>
        </div>
      </Col>
    </Row>
  );
};

// validate with propTypes

MovieView.propTypes = {
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
  onBackClick: PropTypes.func.isRequired,
};
