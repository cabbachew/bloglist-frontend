import PropTypes from "prop-types";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className={message.type}>{message.body}</div>;
};

Notification.propTypes = {
  message: PropTypes.object,
};

export default Notification;
