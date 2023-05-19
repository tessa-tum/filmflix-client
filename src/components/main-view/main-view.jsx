import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  // store movie data retrieved from API
  const [movies, setMovies] = useState([]);

  // store selected movie for displaying details
  const [selectedMovie, setSelectedMovie] = useState(null);

  // fetch API movie data from when component mounts
  useEffect(() => {
    fetch("https://filmflix-api.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {

        // match fetched data to required app structure
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            ImageURL: movie.ImageURL,
            Director: {
              Name: movie.Director.Name,
              Bio: movie.Director.Bio,
            },
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name,
              Description: movie.Genre.Description,
            },
            Featured: movie.Featured,
          };
        });

        // set transformed movie data in state + catch errors
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.log("Error fetching movies:", error);
      });
  }, []);

  // if user selects movie, render MovieView
  if (selectedMovie) {
    //add list of similar movies (that have the same genre)
    let similarMovies = movies.filter(
      (movie) =>
        movie.Genre.Name === selectedMovie.Genre.Name &&
        movie.Title !== selectedMovie.Title
    );

    return (
      <>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        <hr />
        <h2>Similar movies</h2>
        {similarMovies.map((movie) => (
          <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
          />
        ))}
      </>
    );
  }

  // display message if movie list is empty
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  // render MovieCard for each movie
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
