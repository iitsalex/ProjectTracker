import { Modal, Button } from "react-bootstrap";
import React, {Component} from "react";

function ModalTemplate(ComponentToRender) {
  const [modalShow, setModalShow] = React.useState(false);
  return class extends Component{
    render(){
      return (
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Create a new Task!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ComponentToRender/>
          </Modal.Body>
          <Modal.Footer>
            <Button>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }
}

export default ModalTemplate;
