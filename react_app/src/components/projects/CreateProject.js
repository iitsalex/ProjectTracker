import React, { Component } from "react";
import { Form, Button, FormGroup, FormControl, FormLabel } from "react-bootstrap"

class CreateProject extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      team_id: props.team_id
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
      alert('Error logging in please try again');
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <FormLabel className="text-muted">Select a Team</FormLabel>
            <FormControl
              as="select"
              name="team_id"
              value={this.state.team_id}
              onChange={this.handleInputChange}
              maxLength="100"
              autoComplete="off"
              required="required"
            >
              {
                this.props.teams.map(team => {
                  return <option key={team.id} value={team.id}>{team.name}</option>
                })
              }
            </FormControl>
        </FormGroup>

        <FormGroup>
          <FormLabel className="text-muted">Project Name</FormLabel>
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
          <FormLabel className="text-muted">Project Description</FormLabel>
          <FormControl
            type="text"
            name="description"
            placeholder="Enter Project Description"
            value={this.state.description}
            onChange={this.handleInputChange}
            autoComplete="off"
          />
        </FormGroup>

        <Button type="submit" className="btn-block">Submit</Button>
      </Form>
    );
  }
}

export default CreateProject;
