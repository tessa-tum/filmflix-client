import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

export const UserDelete = ({ user }) => {
  const deleteAccount = () => {
    fetch(`https://filmflix-api.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.ok) {
          alert("Your account has been deleted. Good Bye!");
          onLoggedOut();
        } else {
          alert("Could not delete account");
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <>
      <h2 className="mb-3">Delete account</h2>
      <p>Sad to see you go ...</p>
      <Button
        className="btn-secondary"
        onClick={() => {
          if (confirm("Are you sure?")) {
            deleteAccount();
          }
        }}
      >
        Delete
      </Button>
    </>
  );
};

// validate with propTypes

UserDelete.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }).isRequired,
};
