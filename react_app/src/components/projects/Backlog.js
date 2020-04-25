import React, {Component} from 'react';
import CreateTask from "./tasks/CreateTask";

class Backlog extends Component {

  render() {
    const [modalShow, setModalShow] = React.useState(false);
    return (<CreateTask/>);
  }
}

export default Backlog;
