import { Card, Col } from "react-bootstrap";
import PropTypes from "prop-types";

export const UserInfo = ({ user }) => {
  return (
    <Col>
      <Card bsPrefix="profile-card">
        <Card.Body>
          <Card.Title className="mb-3">Your current information</Card.Title>
          <p>Username: {user.Username}</p>
          <p>Email: {user.Email}</p>
          <p>Birthday: {user.Birthday.slice(0, 10)}</p>
        </Card.Body>
      </Card>
    </Col>
  );
};

// validate with propTypes

UserInfo.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }).isRequired,
};
