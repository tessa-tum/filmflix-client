import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

// MainView function component

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")); //use localStorage as default value of user state
  const storedToken = localStorage.getItem("token"); //use localStorage as default value of token state
  const [user, setUser] = useState(storedUser ? storedUser : null); // initialize with null when localStorage is empty
  const [token, setToken] = useState(storedToken ? storedToken : null); // initialize with null when localStorage is empty
  const [movies, setMovies] = useState([]); // store movie data retrieved from API
  const [selectedMovie, setSelectedMovie] = useState(null); // store selected movie for displaying details
  const [loading, setLoading] = useState(false); // track state of async request, show that request is happening

  // connect to filmflix API via useeffect hook

  useEffect(() => {
    if (!token) {
      return;
    }

    setLoading(true); // set loading before sending API request

    fetch("https://filmflix-api.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false); // stop loading after response received
        console.log("data", data);

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
  }, [token]);

  // if user is not signed up or logged in, display LoginView / SignupView
  // will be displayed independently later on

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

  // if user selects movie, display MovieView

  if (selectedMovie) {
    let similarMovies = movies.filter(
      // add list of similar movies (that have the same genre)
      (movie) =>
        movie.Genre.Name === selectedMovie.Genre.Name &&
        movie.Title !== selectedMovie.Title
    );

    return (
      <>
        <button // display logout button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          {" "}
          Logout
        </button>
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

  // if movie list is empty, display respective text message

  if (movies.length === 0) {
    return (
      <>
        <button // display logout button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          {" "}
          Logout
        </button>
        <div>The list is empty!</div>
      </>
    );
  }

  // if user does not select a movie, display movie cards

  return loading ? (
    <p>Loading...</p>
  ) : !movies || !movies.length ? (
    <p>No movies found</p>
  ) : (
    <div>
      <button // display logout button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        {" "}
        Logout
      </button>

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
