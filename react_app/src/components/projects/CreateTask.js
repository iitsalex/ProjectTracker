import React from 'react'
import { Modal } from 'react-bootstrap'

class CreateTask extends React.Component {
  render () {
    return (
      <Modal show={true}>
        <Modal.Header>Create Task</Modal.Header>
        <Modal.Body>Fill out the fields below</Modal.Body>
        <Modal.Footer>This is the footer</Modal.Footer>
      </Modal>
    );
  }
}

export default CreateTask;
