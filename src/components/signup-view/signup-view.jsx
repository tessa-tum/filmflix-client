import { useState } from "react";
import { Form, Button } from "react-bootstrap";

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
          placeholder="Enter a username (min 3 characters)"
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
          placeholder="Enter a password (min 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter a valid email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="birthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <Button bsPrefix="btn" type="submit" className="mt-3">
        Submit
      </Button>
    </Form>
  );
};
