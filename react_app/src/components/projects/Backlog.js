import React from "react";
import { Button } from 'react-bootstrap'
import ModalTemplate from "../ModalTemplate";
import CreateTask from "./tasks/CreateTask";

class Backlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false
    };
  }

  render() {
    return (
      <>
        <Button variant="primary" onClick={() => this.setState({modalShow: true})}>
          Create Task
        </Button>

        <ModalTemplate
          show={this.state.modalShow}
          onHide={() => this.setState({modalShow: false})}
          title="Create Task"
          component={CreateTask}
          project_id={this.props.data.project_id}
        />
      </>
    );
  }
}

export default Backlog;
