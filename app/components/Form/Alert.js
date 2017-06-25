import React from 'react';
import { Alert, Button } from 'react-bootstrap';

const AlertDismissable = (props) => {
  const { visible, type, title, message, handleAlertDismiss } = props;
  if (visible) {
    return (
      <Alert bsStyle={type} onDismiss={handleAlertDismiss}>
        <h4>{title}</h4>
        <p>{message}</p>
        <p>
          <Button onClick={handleAlertDismiss}>Close</Button>
        </p>
      </Alert>
    );
  }

  return (
    <div />
  );
};

AlertDismissable.propTypes = {
  visible: React.PropTypes.bool,
  type: React.PropTypes.string,
  title: React.PropTypes.string,
  message: React.PropTypes.string,
  handleAlertDismiss: React.PropTypes.func,
};

export default AlertDismissable;
