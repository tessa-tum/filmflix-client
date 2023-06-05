import React, { useState, useEffect } from "react";
import { Row, Col, Form, FormControl } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Footer } from "../footer/footer";
import { ProfileView } from "../profile-view/profile-view";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// MainView function component

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")); //use localStorage as default value of user state
  const storedToken = localStorage.getItem("token"); //use localStorage as default value of token state
  const [user, setUser] = useState(storedUser ? storedUser : null); // initialize with null when localStorage is empty
  const [token, setToken] = useState(storedToken ? storedToken : null); // initialize with null when localStorage is empty
  const [movies, setMovies] = useState([]); // store movie data retrieved from API
  const [searchItem, setSearchItem] = useState(""); // enable search for a movie by title

  // enable user updates

  const updateUser = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  // enable search function

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(searchItem.toLowerCase())
  );

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
      .catch(() => {
        toast.error("Error fetching movies. Try a re-load.");
      });
  }, [token]);

  return (
    <BrowserRouter>
      <Row>
        <Col>
          <NavigationBar
            user={user}
            onLoggedOut={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
              window.location.reload();
            }}
            searchItem={searchItem}
            setSearchItem={setSearchItem}
          />
        </Col>
      </Row>
      <Row>
        <Col className="mt-5"></Col>
      </Row>

      <Row className="justify-content-center">
        <Routes>
          <Route // to LoginView
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col xs={12} sm={10} md={6} lg={4} xl={4} className="mt-5">
                    <h1 className="text-center">
                      Welcome to {""}
                      <span style={{ color: "#ff8906" }}>filmflix!</span>
                    </h1>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setToken(token);
                        setUser(user);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route // to Signup View
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col xs={12} sm={10} md={6} lg={4} xl={4} className="mt-5">
                    <h1 className="text-center">
                      Sign up {""}
                      <span style={{ color: "#ff8906" }}>here</span>
                    </h1>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />

          <Route // to MovieView
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col md={5} className="mt-5">
                    <h2>There are no movies!</h2>
                  </Col>
                ) : (
                  <Col>
                    <MovieView
                      movies={movies}
                      user={user}
                      token={token}
                      updateUser={updateUser}
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route // to ProfileView
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <ProfileView
                  user={user}
                  token={token}
                  movies={movies}
                  onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                    window.location.reload();
                  }}
                  updateUser={updateUser}
                />
              )
            }
          />

          <Route // to MainView
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col md={5} className="mt-5">
                    <h2>There are no movies!</h2>
                  </Col>
                ) : (
                  <>
                    {/* add search bar for movie by title */}
                    <Row>
                      <Col className="ps-0">
                        <div style={{ width: "30%" }}>
                          <Form className="d-flex mb-5 mt-2">
                            <FormControl
                              type="text"
                              placeholder="Search for a movie by title"
                              value={searchItem}
                              onChange={(e) => setSearchItem(e.target.value)}
                              className="rounded-0"
                            />
                          </Form>
                        </div>
                      </Col>
                    </Row>
                    {filteredMovies.map((movie) => (
                      <Col
                        className="mb-4"
                        key={movie._id}
                        xs={12}
                        sm={6}
                        md={4}
                        xl={3}
                      >
                        <MovieCard
                          movie={movie}
                          user={user}
                          token={token}
                          updateUser={updateUser}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>

      {/* <Row>
        <Col>
          <Footer />
        </Col>
      </Row> */}
    </BrowserRouter>
  );
};
