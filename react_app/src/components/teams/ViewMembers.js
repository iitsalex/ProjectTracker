import React, {Component} from "react";
import {Form, Button, FormGroup, FormControl, FormLabel} from "react-bootstrap"
import "./Teams.css";

class ViewMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      message: ''
    };
  }

  handleInputChange = (event) => {
    const {value, name} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return (<div className="ViewMembers">

    </div>);
  }
}

export default ViewMembers;
