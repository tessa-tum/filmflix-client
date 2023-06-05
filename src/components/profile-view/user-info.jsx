import PropTypes from "prop-types";

export const UserInfo = ({ user }) => {
  return (
    <>
      <h3 className="mb-3">Account information</h3>

      <p>Username: {user.Username}</p>
      <p>Email: {user.Email}</p>
      <p className="m-0">Birthday: {user.Birthday !== undefined ? user.Birthday.slice(0, 10) : ""}</p>
    </>
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
