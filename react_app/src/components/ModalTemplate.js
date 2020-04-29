import React from 'react'
import { Modal, Button } from 'react-bootstrap'

function ModalTemplate(props) {
  // overflow all other props to component, including onHide for hiding modal
  var {show, title, component, ...other} = props;
  return (
    <Modal
      show={show}
      onHide={other.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {React.createElement(component, other)}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='info' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalTemplate;
