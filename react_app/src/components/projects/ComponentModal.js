import React from 'react';
import { Button } from "react-bootstrap";
import ModalTemplate from "../ModalTemplate";
import Login from "../accounts/Login";

  function ComponentModal() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <ModalTemplate
        show={modalShow}
        onHide={() => setModalShow(false)}
        component={ModalTemplate(Login)}
      />
    </>
  );
}

export default ComponentModal;
