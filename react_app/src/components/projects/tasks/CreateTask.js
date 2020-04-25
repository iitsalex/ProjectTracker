import React, { Component } from "react";
import { Form, Button, FormGroup, FormControl, FormLabel } from "react-bootstrap"
import "../Projects.css";

class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        window.location.href = 'backlog';
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <FormLabel className="text-muted">Task Name</FormLabel>
          <FormControl
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
          <FormLabel className="text-muted">Task Description</FormLabel>
          <FormControl
            type="text"
            name="description"
            placeholder="Enter Project Description"
            value={this.state.description}
            onChange={this.handleInputChange}
            autoComplete="off"
          />
        </FormGroup>

        <Button type="submit" className="btn-dark btn-block">Submit</Button>
      </Form>
    );
  }
}

export default CreateTask;
