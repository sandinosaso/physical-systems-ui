import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalHOC = (props) =>
(
  <div>
    <Modal show={props.show} backdrop onHide={props.onHide} bsSize="large">
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {props.children}
      </Modal.Body>

    </Modal>
  </div>
);

ModalHOC.propTypes = {
  show: React.PropTypes.bool,
  onHide: React.PropTypes.func,
  title: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default ModalHOC;
