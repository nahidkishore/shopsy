import React from 'react';
import { Modal, Button } from 'react-bootstrap';
const ModalScreen = (props) => {
  return (
    <Modal size={props.size} show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button {...props} variant='primary' onClick={props.onSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalScreen;
