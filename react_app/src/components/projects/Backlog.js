import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";
import TasksCreate from "./TasksCreate";

class Backlog extends Component {

  render() {
    return (<TasksCreate/>);
  }
}

export default Backlog;
