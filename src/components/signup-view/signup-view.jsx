import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// SignupView function component

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  // validate user signup

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://filmflix-api.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  // display signup form

  return (
    <Form onSubmit={handleSubmit} className="mt-5">
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          className= "rounded-0"
          placeholder="Must have at least 3 characters"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={4}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          className= "rounded-0"
          placeholder="Must have at least 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          className= "rounded-0"
          placeholder="Must be a valid email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="birthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          className= "rounded-0"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit" className="mt-3 btn-secondary">
        Signup
      </Button>

      <div className="mt-5 text-muted text-center">
        You already have an account? <br />
      </div>

      <div className="mt-2 text-center" style={{ color: "#ff8906" }}>
        <Link to="/login" className="text-muted text-decoration-none">
          <span style={{ color: "#ff8906" }}> Login here!</span>
        </Link>
      </div>
    </Form>
  );
};
