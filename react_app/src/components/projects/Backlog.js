import React from "react";
import { Button } from 'react-bootstrap'
import ModalTemplate from "../ModalTemplate";
import CreateTask from "./tasks/CreateTask";

function Backlog() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Create Task
      </Button>

      <ModalTemplate
        show={modalShow}
        onHide={() => setModalShow(false)}
        title="Create Task"
        component={<CreateTask/>}
      />
    </>
  );
}

export default Backlog;
