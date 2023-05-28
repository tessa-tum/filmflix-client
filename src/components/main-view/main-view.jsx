import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

import { Button, Row, Col } from "react-bootstrap";

// MainView function component

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")); //use localStorage as default value of user state
  const storedToken = localStorage.getItem("token"); //use localStorage as default value of token state
  const [user, setUser] = useState(storedUser ? storedUser : null); // initialize with null when localStorage is empty
  const [token, setToken] = useState(storedToken ? storedToken : null); // initialize with null when localStorage is empty
  const [movies, setMovies] = useState([]); // store movie data retrieved from API
  const [selectedMovie, setSelectedMovie] = useState(null); // store selected movie for displaying details

  // connect to filmflix API via useeffect hook

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://filmflix-api.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
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

  // apply bootstrap styling

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col className="mt-5" md={5}>
          <h1>
            Welcome to <span style={{ color: "#ff8906" }}>filmflix!</span>
          </h1>
          <LoginView
            onLoggedIn={(user, token) => {
              setToken(token);
              setUser(user);
            }}
          />
          <div className="mt-5 text-muted text-center">
            You do not have an account? <br />
            Sig up now!
          </div>
          <SignupView />
        </Col>
      ) : movies.length === 0 ? (
        <Col md={5} className="mt-5">
          <h2>There are no movies!</h2>
        </Col>
      ) : selectedMovie ? (
        <Col>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
          <hr className="mt-3 mb-5" />

          <h3 className="mb-5">Similar Movies</h3>

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {movies
              .filter(
                (movie) =>
                  movie.Genre.Name === selectedMovie.Genre.Name &&
                  movie.Title !== selectedMovie.Title
              )

              .map((movie) => (
                <Col
                  className="me-4"
                  key={movie._id}
                  xs={4}
                  sm={3}
                  md={2}
                  lg={2}
                >
                  <MovieCard
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                      setSelectedMovie(newSelectedMovie);
                    }}
                  />
                </Col>
              ))}
          </div>
        </Col>
      ) : (
        <>
          <Row className="mt-5 mb-5">
            <Col md={3}>
              <Button
                bsPrefix="btn"
                type= "button"
                onClick={() => {
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }}
              >
                Logout
              </Button>
            </Col>
          </Row>

          {movies.map((movie) => (
            <Col className="mb-4" key={movie._id} sm={6} md={4} xl={3}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};
