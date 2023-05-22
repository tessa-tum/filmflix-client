import PropTypes from "prop-types";

// MovieView function component

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.ImageURL} alt={movie.Title} className="movie-image" />
      </div>
      <div className="movie-text-title">
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div className="movie-text">
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div className="movie-text">
        <span>Director: </span>
        <span>{`${movie.Director.Name} --- `}</span>
        <span>{`${movie.Director.Bio}`}</span>
      </div>
      <div className="movie-text">
        <span>Genre: </span>
        <span>{`${movie.Genre.Name} --- `}</span>
        <span>{`${movie.Genre.Description}`}</span>
      </div>
      <button className="movie-button" onClick={onBackClick}>
        Go back
      </button>
    </div>
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
