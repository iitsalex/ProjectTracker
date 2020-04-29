import React, { Component } from "react";
import { Form, Button, FormGroup, FormControl, FormLabel, Col } from "react-bootstrap"

class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      status: 'New',
      points: 0,
      assignee_id: 'null',
      project_id: this.props.project_id,
      priority: ''
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
        this.props.updateTasks();
        this.props.onHide();
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }

  handleInputChange = (event) => {
    const {value, name} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} className="form-wide">
        <Form.Row>
          <FormGroup as={Col}>
            <FormLabel className="text-muted">Task Name</FormLabel>
            <FormControl
              type="text"
              name="name"
              placeholder="Enter Task Name"
              value={this.state.name}
              onChange={this.handleInputChange}
              maxLength="100"
              autoComplete="off"
              required
            />
          </FormGroup>
          <FormGroup as={Col}>
            <FormLabel className="text-muted">Status</FormLabel>
            <FormControl
              as="select"
              name="status"
              placeholder="Status Selection"
              value={this.state.status}
              onChange={this.handleInputChange}
              autoComplete="off"
              required
            >
              <option>{"New"}</option>
              <option>{"In Progress"}</option>
              <option>{"Done"}</option>
            </FormControl>
          </FormGroup>
        </Form.Row>

        <FormGroup>
          <FormLabel className="text-muted">Task Description</FormLabel>
          <FormControl
            as="textarea"
            type="text"
            name="description"
            placeholder="Enter Task Description"
            value={this.state.description}
            onChange={this.handleInputChange}
            autoComplete="off"
            rows="5"
          />
        </FormGroup>
        <Form.Row>
          <FormGroup as={Col}>
            <FormLabel className="text-muted">Assignee</FormLabel>
            <FormControl
              as="select"
              type="text"
              name="assignee_id"
              placeholder="Choose Assignee"
              value={this.state.assignee_id}
              onChange={this.handleInputChange}
              autoComplete="off"
            >
              <option key={'null'} value={'null'}>Unassigned</option>
              {this.props.team_members.map(user =>
                <option key={user.id} value={user.id}>{user.lname + ', ' + user.fname}</option>
              )}
            </FormControl>
          </FormGroup>
          <FormGroup as={Col}>
            <FormLabel className="text-muted">Points</FormLabel>
            <FormControl
              type="number"
              name="points"
              placeholder="Hours spent on task"
              value={this.state.points}
              onChange={this.handleInputChange}
              autoComplete="off"
            />
          </FormGroup>
        </Form.Row>

        <Button className="btn-block btn-wide">Template</Button>
        <Button type="submit" className="btn-block btn-wide">Submit</Button>
      </Form>
    );
  }
}

export default CreateTask;
