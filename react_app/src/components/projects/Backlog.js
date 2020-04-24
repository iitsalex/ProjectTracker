import React, {Component} from 'react';
import { Button, Modal } from "react-bootstrap";
import TaskCreateWindow from "./TasksCreate";

const modalShow = false;
const setModalShow = false;

class Backlog extends Component {

  render () {
    return (
      <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Launch vertically centered modal
        </Button>

        <TaskCreateWindow
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    )
  };
}

export default Backlog;
