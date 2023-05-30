import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// MovieCard function component

export const MovieCard = ({ movie, user, token, updateUser }) => {
  const [isFavorite, setIsFavorite] = useState(
    user.FavoriteMovies.includes(movie._id)
  );

  useEffect(() => {
    setIsFavorite(user.FavoriteMovies.includes(movie._id));
    window.scrollTo(0, 0);
  }, [movie]);

  // add movie to list of favorites in ProfileView

  const addFavorite = () => {
    fetch(
      `https://filmflix-api.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Successfully added to favorites");
          setIsFavorite(true);
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  // remove movie from list of favorites in ProfileView

  const removeFavorite = () => {
    fetch(
      `https://filmflix-api.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Successfully removed from favorites");
          setIsFavorite(false);
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <Card bsPrefix="card" className="h-100" border="light">
      <Card.Img variant="top" src={movie.ImageURL} alt={movie.Title} />
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Card.Title bsPrefix="card-title">{movie.Title}</Card.Title>
          <Card.Text bsPrefix="card-text">{movie.Director.Name}</Card.Text>
        </div>
        <div style={{ marginTop: "12px" }}>
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
            <Button className="btn w-100 mb-3 mt-3">See more</Button>
          </Link>
        </div>

        {isFavorite ? (
          <Button onClick={removeFavorite} className="btn-secondary w-100">
            Remove from favorites
          </Button>
        ) : (
          <Button onClick={addFavorite} className="btn-secondary w-100">
            Add to favorites
          </Button>
        )}
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
