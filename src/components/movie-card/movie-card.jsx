import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          toast.error("Failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          toast.success("Added to favorites", {
            autoClose: 1000,
            hideProgressBar: true,
          });
          setIsFavorite(true);
          updateUser(user);
        }
      })
      .catch((e) => {
        toast.error(e);
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
          toast.error("Failed", {
            autoClose: 2000,
          });
          return false;
        }
      })
      .then((user) => {
        if (user) {
          toast.success("Removed from favorites", {
            autoClose: 1000,
            hideProgressBar: true,
          });
          setIsFavorite(false);
          updateUser(user);
        }
      })
      .catch((e) => {
        toast.error(e);
      });
  };

  return (
    <Card bsPrefix="card" className="h-100" border="light">
      <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
        <Card.Img variant="top" src={movie.ImageURL} alt={movie.Title} />
      </Link>
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Card.Title bsPrefix="card-title">{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>

        {isFavorite ? (
          <Button
            onClick={removeFavorite}
            className="btn-secondary w-100 mt-3 text-align-bottom"
          >
            Remove from favs
          </Button>
        ) : (
          <Button
            onClick={addFavorite}
            className="btn-secondary w-100 mt-3 text-align-bottom"
          >
            Add to favs
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
