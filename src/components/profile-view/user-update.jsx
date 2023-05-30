import { useState } from "react";
import { Card, Col, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";

export const UserUpdate = ({ user, token, updateUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch(`https://filmflix-api.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Changing userdata failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Successfully changed userdata");
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <Col>
      <Card
        className="mx-auto col-10 col-md-8 col-lg-6"
        bsPrefix="profile-card"
      >
        <Card.Body>
          <Card.Title className="mb-3">Update your info</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="5"
                className="bg-light"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
                className="bg-light"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-light"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
                className="bg-light"
              />
            </Form.Group>
            <Button className="mt-4 mb-2 btn-secondary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};

// validate with propTypes

UserUpdate.propTypes = {
  token: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }).isRequired,
};
