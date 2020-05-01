import React, { Component } from "react";
import { Form, Button, FormGroup, FormControl, FormLabel } from "react-bootstrap"

class CreateProject extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      team_id: props.team_id,
      message: ''
    };
  }

  handleInputChange = (event) => {
    const {value, name} = event.target;
    this.setState({[name]: value});
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        this.props.updateProjects();
        this.props.onHide();
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).catch(err => {
      console.error(err);
      this.setState({
        message: 'An error occured creating this project'
      });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} className="wide">
        <FormGroup>
          <FormLabel className="text-muted">Project Name</FormLabel>
          <FormControl
            className="wide"
            type="text"
            name="name"
            placeholder="Enter Project Name"
            value={this.state.name}
            onChange={this.handleInputChange}
            maxLength="100"
            autoComplete="off"
            required
          />
        </FormGroup>

        <FormGroup>
          <FormLabel className="text-muted">Project Description</FormLabel>
          <FormControl
            className="wide"
            as="textarea"
            type="text"
            name="description"
            placeholder="Enter Project Description"
            value={this.state.description}
            onChange={this.handleInputChange}
            autoComplete="off"
            rows="5"
          />
        </FormGroup>

        <Button variant='info' type="submit" className="btn-block wide">Submit</Button>
        <p>{this.state.message}&nbsp;</p>
      </Form>
    );
  }
}

export default CreateProject;
