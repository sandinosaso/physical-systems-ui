import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const MarkerInfo = (props) => {
  console.log('On MarkerInfo props:', props);
  const { show, selectedMarkerInfo, onClose } = props;
  const { name, address } = selectedMarkerInfo;

  return (
    <Modal show={show} backdrop={false}>
      <Modal.Header>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <h1>{name}</h1>
          {address}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>

    </Modal>
  );
};

MarkerInfo.propTypes = {
  show: React.PropTypes.bool,
  onClose: React.PropTypes.func,
  selectedMarkerInfo: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
};

export default MarkerInfo;
