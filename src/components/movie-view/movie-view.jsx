export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.ImageURL} alt={movie.Title} class="movie-image" />
      </div>
      <div class="movie-text-title">
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div class="movie-text">
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div class="movie-text">
        <span>Director: </span>
        <span>{`${movie.Director.Name} --- `}</span>
        <span>{`${movie.Director.Bio}`}</span>
      </div>
      <div class="movie-text">
        <span>Genre: </span>
        <span>{`${movie.Genre.Name} --- `}</span>
        <span>{`${movie.Genre.Description}`}</span>
      </div>
      <button class="movie-button" onClick={onBackClick}>Go back</button>
    </div>
  );
};