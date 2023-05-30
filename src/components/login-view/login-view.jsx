import { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// LoginView function component

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // prevent default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://filmflix-api.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  // display login form

  return (
    <Form onSubmit={handleSubmit} className="mt-5">
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength={3}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={4}
          required
        />
      </Form.Group>
      <Button type="submit" className="mt-3 btn-secondary">
        Log In
      </Button>
      <div className="mt-5 text-muted text-center">
        You do not have an account? <br />
      </div>
      <div className="mt-2 text-center" style={{ color: "#ff8906" }}>
        <Link to="/signup" className="text-muted text-decoration-none">
          <span style={{ color: "#ff8906" }}> Sign up here!</span>
        </Link>
      </div>
    </Form>
  );
};

// validate with propTypes

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
