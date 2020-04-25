import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import CreateTask from "./CreateTask";

function CreateTaskModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateTask/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateTaskModal;
