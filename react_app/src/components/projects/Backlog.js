import React from "react";
import { Button } from 'react-bootstrap'
import CreateTaskModal from "./tasks/CreateTaskModal";

function Backlog() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Create Task
      </Button>

      <CreateTaskModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default Backlog;
