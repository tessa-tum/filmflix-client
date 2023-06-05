import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserDelete = ({ user }) => {
  const deleteAccount = () => {
    fetch(`https://filmflix-api.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Your account has been deleted. Good Bye!", {
            autoClose: 2000,
            hideProgressBar: true,
          });
          onLoggedOut();
        } else {
          toast.error("Could not delete account", {
            autoClose: 2000,
            hideProgressBar: true,
          });
        }
      })
      .catch((e) => {
        toast.error(e);
      });
  };

  return (
    <>
      <h3 className="mb-3">Delete account</h3>
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
